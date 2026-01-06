// routes/Payment.js
const express = require("express");
const router = express.Router();
const { capturePayment } = require("../controllers/Payments");
const { auth } = require("../middlewares/auth");

router.post("/capturePayment", auth, capturePayment);

module.exports = router;
