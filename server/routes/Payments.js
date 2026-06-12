// routes/Payment.js

const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments");

const {
  auth,
  isStudent,
} = require("../middlewares/auth");

// Capture Payment
router.post(
  "/capturePayment",
  auth,
  isStudent,
  capturePayment
);

// Verify Payment
router.post(
  "/verifyPayment",
  auth,
  isStudent,
  verifyPayment
);

// Send Payment Success Email
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);

module.exports = router;