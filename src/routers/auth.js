const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authRequest = require('../requests/authRequest');

// Đăng ký, Đăng nhập
router.post("/register",authRequest.validateRegisterData, authController.registerController);
router.post("/login", authRequest.validateLoginData, authController.loginController);

module.exports = router;
