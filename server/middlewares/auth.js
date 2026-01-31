const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// ================= AUTH =================

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER ", authHeader);
    console.log("JWT SECRET ", process.env.JWT_SECRET);

   
    if (!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing from header",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("AUTH ERROR ", error.message);
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }
};


// ================= IS STUDENT =================
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// ================= IS INSTRUCTOR =================
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// ================= IS ADMIN =================
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
