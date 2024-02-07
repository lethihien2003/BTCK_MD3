//Định nghĩa schema kiểm tra dữ liệu với Joi
const Joi = require("joi");

// Định nghĩa schema kiểm tra dữ liệu cho yêu cầu đăng ký
const registerValidationSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
            'string.empty': `"name" không được bỏ trống !`,
            'string.max': `"name" không được vượt quá 255 ký tự !`
        }),
  username: Joi.string().required().messages({
    'any.required': `"username" không được bỏ trống !`
}),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
    'any.required': `"password" không được bỏ trống !`,
    'string.pattern.base': `"password" phải chứa ít nhất 3 ký tự và không quá 30 ký tự, bao gồm các ký tự chữ cái và số !`
})
});

// Định nghĩa schema kiểm tra dữ liệu cho yêu cầu đăng nhập
const loginValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': `"username" không được bỏ trống !`
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
    'any.required': `"password" không được bỏ trống !`,
    'string.pattern.base': `"password" phải chứa ít nhất 3 ký tự và không quá 30 ký tự, bao gồm các ký tự chữ cái và số !`
  })
});

// Middleware kiểm tra và xác thực dữ liệu
const validateUserData = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value;
  next();
};

const validateRegisterData = validateUserData(registerValidationSchema);
const validateLoginData = validateUserData(loginValidationSchema);

module.exports = {
  validateRegisterData,
  validateLoginData,
};
