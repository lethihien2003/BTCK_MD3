const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  register = async ({ name, username, password, phone }) => {
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const createUser = new User({
      name,
      username,
      password: password_hash,
      phone,
    });

    await createUser.save();
  };

  login = async ({ username, password }) => {
    const user = await User.findOne({ username, deleted_at: null });

    if (user) {
      const verified = bcrypt.compareSync(password, user.password);
      if (verified) {
        return user;
      }
    }

    return false;
  };

  authToken = async (id) => {
    // Thời hạn của token sử dụng từ thời điểm tạo
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const secretKey = process.env.SECRET_KEY;

    const token = await jwt.sign({ id }, secretKey, { expiresIn });

    return {
      token,
      expire_in: expiresIn,
    };
  };
}

module.exports = new AuthService();
