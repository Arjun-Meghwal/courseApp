const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth");


const {
  updateProfile,
  updateProfilePicture,
  deleteAccount,
  getAllUserDetails,
  getEnrolledCourse,
  instructorDashboard,
} = require("../controllers/Profile");


router.put("/updateProfile", auth, updateProfile);
router.put("/updateProfilePicture", auth, updateProfilePicture);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourse", auth, getEnrolledCourse);
router.get("/getInstructorDashboardDetails", auth, isInstructor, instructorDashboard)


module.exports = router;