const Joi = require("joi");
const Board = require("../models/board");
const { responseError } = require("../utils/response");
const { isValidObjectId } = require("mongoose");

// Thêm một bảng mới
const createBoardValidationSchema = Joi.object({
    title: Joi.string().max(255).required().trim().strict().messages({
        'any.required': `"title" không được bỏ trống !`
    })
});

// Cập nhật thông tin của một bảng
const updateBoardValidationSchema = Joi.object({
    title: Joi.string().max(255).required().trim().strict().messages({
        'any.required': `"title" không được bỏ trống !`
    })
});


// Middleware kiểm tra và xác thực dữ liệu 
const validateBoardData = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }

    req.body = value;
    next();
};

const validateCreateBoardData = validateBoardData(createBoardValidationSchema);
const validateUpdateBoardData = validateBoardData(updateBoardValidationSchema);

const checkBoardId = async (req, res, next) => {
    const _id = req.params.id;

    if (isValidObjectId(_id)) {
        const board = await Board.findOne({_id, deleted_at: null});
        if (board) {
            req.board = board;
            return next();
        }
        return responseError(res, null, 404, "Bảng không tồn tại hoặc đã bị xóa");
    }

    return responseError(res,null , 404, "ID bảng không hợp lệ.");
}


module.exports = {
    checkBoardId,
    validateCreateBoardData,
    validateUpdateBoardData,
};
