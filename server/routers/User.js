// routes/User.js
const express = require("express");
const router = express.Router();
const { sendOTP, signup, login } = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

router.post("/sendotp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
