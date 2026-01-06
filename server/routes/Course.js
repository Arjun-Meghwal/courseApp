const express = require("express");
const router = express.Router();

const {
  createCourse,
  showAllCourse,
  getCategoryPageDetails,
  showAllCategories,
} = require("../controllers/Course");

router.post("/createCourse", createCourse);
router.get("/showAllCourses", showAllCourse);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails);

module.exports = router;
