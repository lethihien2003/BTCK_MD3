const generateToken = (data, expiresIn, secretKey) => {
  return jwt.sign(data, secretKey || process.env.SECRET_KEY, {
    ...(expiresIn ? { expiresIn } : {}),
  });
};

module.exports = { generateToken };
