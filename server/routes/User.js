const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendOtp,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");
// const { authenticate } = require("passport");

// Routes for Login, Signup, and Authentication

//  Authentication routes


// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp);

// Route for Changing the password
router.post("/changepassword", auth, changePassword);
//  Reset Password


// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);
console.log("resetPasswordToken =", resetPasswordToken);
console.log("resetPassword =", resetPassword);

// google authenticate
router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: req.query.accountType || "Student",
  })(req, res, next);
});


// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async (req, res) => {
    try {

      const user = await User.findById(req.user._id)
        .populate("additionalDetails");

      console.log(
        "GOOGLE LOGIN USER =>",
        JSON.stringify(user, null, 2)
      );

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      const userData = encodeURIComponent(
        JSON.stringify(user)
      );

      res.redirect(
        `http://localhost:3000/google-success?token=${token}&user=${userData}`
      );

    } catch (error) {

      console.log("GOOGLE CALLBACK ERROR", error);

      res.redirect(
        "http://localhost:3000/login"
      );
    }
  }
);
// router.post("/changepassword", auth, changePassword);
// Export the router for use in the main application
module.exports = router;