const Joi = require("joi");
const { isValidObjectId } = require("mongoose");
const List = require("../models/list");
const { responseError } = require("../utils/response");

// Thêm một danh sách mới
const createListValidationSchema = Joi.object({
    title: Joi.string().max(255).required().trim().strict().messages({
        'any.required': `"title" không được bỏ trống !`
    }),
    position: Joi.number().required(), 
    boardId: Joi.string().required().messages({
        'any.required': `"boardId" không được bỏ trống !`
    })
});

//Cập nhật thông tin của một danh sách
const updateListValidationSchema = Joi.object({
    title: Joi.string().max(255).required().trim().strict().messages({
        'any.required': `"title" không được bỏ trống !`
    }),
    position: Joi.number().required(),
    boardId: Joi.string().required().messages({
        'any.required': `"boardId" không được bỏ trống !`
    })
});

// Middleware kiểm tra và xác thực dữ liệu 
const validateListData = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }

    req.body = value;
    next();
};

const validateCreateListData = validateListData(createListValidationSchema);
const validateUpdateListData = validateListData(updateListValidationSchema);

const checkListId = async (req, res, next) => {
    const _id = req.params.id;

    if (isValidObjectId(_id)) {
        const list = await List.findOne({_id, deleted_at: null});
        if (list) {
            req.list = list;
            return next();
        }
        return responseError(res, null, 404, "Thẻ không tồn tại hoặc đã bị xóa");
    }

    return responseError(res,null , 404, "ID thẻ không hợp lệ.");
}

module.exports = {
    checkListId,
    validateCreateListData,
    validateUpdateListData,
    
};
