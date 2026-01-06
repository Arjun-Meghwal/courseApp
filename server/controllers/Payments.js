const razorpayInstance = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/user");
const mongoose = require("mongoose");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

// ================= CAPTURE PAYMENT =================
exports.capturePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const uid = new mongoose.Types.ObjectId(userId);
    if (courseDetails.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "User already enrolled",
      });
    }

    const options = {
      amount: courseDetails.price * 100,
      currency: "INR",
      receipt: Date.now().toString(),
      notes: {
        courseId,
        userId,
      },
    };

    const paymentResponse = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      courseName: courseDetails.courseName,
      thumbnail: courseDetails.thumbnail,
      orderId: paymentResponse.id,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= VERIFY SIGNATURE =================
exports.verifySignature = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature !== digest) {
      return res.status(400).json({
        success: false,
        message: "Signature mismatch",
      });
    }

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true }
    );

    await mailSender(
      enrolledStudent.email,
      "Course Enrollment Successful",
      `You are enrolled in ${enrolledCourse.courseName}`
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified & course enrolled",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
