const express = require("express");
const router = express.Router();

const {
  updateProfile,
  updateProfilePicture,   
  deleteAccount,
  getAllUserDetails,
  getEnrolledCourses,
} = require("../controllers/Profile");

const { auth } = require("../middlewares/auth");

// routes
router.put("/updateProfile", auth, updateProfile);
router.put("/updateProfilePicture", auth, updateProfilePicture); // ✅ ADD
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

module.exports = router;