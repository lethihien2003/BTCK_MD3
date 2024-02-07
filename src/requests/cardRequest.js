const Joi = require("joi");
const Card = require("../models/card");
const { isValidObjectId } = require("mongoose");
const { responseError } = require("../utils/response");

// Thêm một thẻ mới
const createCardValidationSchema = Joi.object({
    title: Joi.string().required().trim().strict().messages({
        'any.required': `"title" không được bỏ trống !`
    }),
    description: Joi.string(),
    listId: Joi.string().required().messages({
        'any.required': `"listId" không được bỏ trống !`
    })
});

// Cập nhật thông tin của một thẻ
const updateCardValidationSchema= Joi.object({
    title: Joi.string().required().trim().strict().messages({
        'any.required': `"title" không được bỏ trống !`
    }),
    description: Joi.string(),
    listId: Joi.string().required().messages({
        'any.required': `"listId" không được bỏ trống !`
    })
});


// Middleware kiểm tra và xác thực dữ liệu
const validateCardData = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }

    req.body = value;
    next();
};

const validateCreateCardData = validateCardData(createCardValidationSchema);
const validateUpdateCardData = validateCardData(updateCardValidationSchema);

const checkCardId = async (req, res, next) => {
    const _id = req.params.id;

    if (isValidObjectId(_id)) {
        const card = await Card.findOne({_id, deleted_at: null});
        if (card) {
            req.card = card;
            return next();
        }
        return responseError(res, null, 404, "Danh sách không tồn tại hoặc đã bị xóa");
    }

    return responseError(res,null , 404, "ID danh sách không hợp lệ.");
}

module.exports = {
    checkCardId,
    validateCreateCardData,
    validateUpdateCardData
    
};
