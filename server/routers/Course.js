// routes/Course.js
const express = require("express");
const router = express.Router();
const { showAllCategories } = require("../controllers/Tag");

const {
  createCourse,
  getAllCourses,
} = require("../controllers/Course");
const { auth } = require("../middlewares/auth");

router.post("/createCourse", auth, createCourse);
router.get("/getAllCourses", getAllCourses);
router.get("/showAllCategories", showAllCategories);
module.exports = router;
