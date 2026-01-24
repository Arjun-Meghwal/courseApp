const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");


const {
  updateProfile,
  updateProfilePicture,
  deleteAccount,
  getAllUserDetails,
  getEnrolledCourses,
} = require("../controllers/Profile");


router.put("/updateProfile", auth, updateProfile);
router.put("/updateProfilePicture", auth, updateProfilePicture);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);


module.exports = router;