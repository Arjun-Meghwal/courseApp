const express = require("express");
const router = express.Router();

const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/Cart");

const { auth, isStudent } = require("../middlewares/auth");

// Add Course
router.post(
  "/add",
  auth,
  isStudent,
  addToCart
);

// Remove Course
router.post(
  "/remove",
  auth,
  isStudent,
  removeFromCart
);

// Get Cart
router.get(
  "/get",
  auth,
  isStudent,
  getCart
);

module.exports = router;