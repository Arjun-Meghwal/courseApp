const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// ==================== RESET PASSWORD TOKEN ====================
exports.resetPasswordToken = async (req, res) => {
  try {
    console.log("=== RESET PASSWORD API CALLED ===");
    const { email } = req.body;
    console.log("email",email);
    // Check user exists
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Your email is not registered with us",
      });
    }

    // Generate token
    const token = crypto.randomUUID();
    console.log("token generate ",token);

    // Save token and expiry in DB
    await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // Create reset URL
    const url = `http://localhost:3000/update-password/${token}`;

    // Send mail
    const response = await mailSender(
      email,
      "Password Reset Link",
      `<p>Click the link below to reset your password:</p>
       <a href="${url}">${url}</a>`
    );

    console.log("MAIL RESPONSE:", response.accepted);

    return res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset password mail",
    });
  }
};

// ==================== RESET PASSWORD ====================
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find user using token
    const userDetails = await User.findOne({ token });

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Check token expiry
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token has expired, please generate a new one",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};