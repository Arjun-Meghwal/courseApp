const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const {
  askAI,
  recommendCourses,
} = require("../controllers/AI");

// AI Chat
router.post("/ask-ai", askAI);

// AI Course Recommendation
router.get(
  "/recommend-course",
  auth,
  recommendCourses
);

module.exports = router;