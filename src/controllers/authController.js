const { responseSuccess, responseError } = require("../utils/response");
const authService = require("../services/authService");

class AuthController {
  registerController = async (req, res) => {
    await authService.register(req.body);

    return responseSuccess(res, null, 201, "Đăng kí thành công");
  };

  loginController = async (req, res) => {
    const login = await authService.login(req.body);

    if (login) {
      return responseSuccess(
        res,
        await authService.authToken(login._id),
        200,
        "Đăng nhập thành công"
      );
    } else {
      return responseError(
        res,
        null,
        400,
        "Tên đăng nhập hoặc mật khẩu không chính xác."
      );
    }
  };
}

module.exports = new AuthController();
