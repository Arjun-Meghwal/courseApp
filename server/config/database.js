const User = require("../models/user");
const OTP = require("../models/otp");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { JWT_SECRET } = require("../config");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.create({ email, otp });

    res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp, accountType } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Password mismatch" });
    }

    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp || recentOtp.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = await Profile.create({});

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.accountType },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.token = token;
    user.password = undefined;

    res.status(200).json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
