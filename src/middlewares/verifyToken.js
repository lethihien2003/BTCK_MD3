const jwt = require("jsonwebtoken");
const { responseError } = require("../utils/response");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return responseError(res, null, 401, "Token không được cung cấp");
  }

  token = token.replace(/^Bearer\s+/, "");

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return responseError(res, null, 401, "Từ chối truy cập");
    }
    req.username = decoded.username;
    next();
  });
};

module.exports = { verifyToken };
