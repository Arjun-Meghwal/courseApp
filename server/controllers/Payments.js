const razorpayInstance = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const CourseProgress = require("../models/CourseProgress");

// ================= CAPTURE PAYMENT =================
exports.capturePayment = async (req, res) => {

  try {

    const { courses } = req.body;

    const userId = req.user.id;

    if (courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide Course Id",
      });
    }

    let totalAmount = 0;

    for (const course_id of courses) {

      const course = await Course.findById(course_id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Could not find the course",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student already enrolled",
        });
      }

      totalAmount += course.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Date.now().toString(),
    };

    const paymentResponse = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;

    const userId = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    await enrollStudents(courses, userId);

    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ENROLL STUDENT =================
const enrollStudents = async (courses, userId) => {

  for (const courseId of courses) {

    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          studentsEnrolled: userId,
        },
      },
      { new: true }
    );

    if (!enrolledCourse) {
      console.log("Course not found");
      continue;
    }

    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
        },

        $pull: {
          cart: courseId,
        },
      },
      {
        new: true,
      }
    );
    
await CourseProgress.create({
  courseId: courseId,
  userId: userId,
  completedVideos: [],
});
    await mailSender(
      enrolledStudent.email,
      "Course Enrolled Successfully",
      `You are successfully enrolled into ${enrolledCourse.courseName}`
    );
  }
};

// ================= SEND PAYMENT SUCCESS EMAIL =================
exports.sendPaymentSuccessEmail = async (req, res) => {

  try {

    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      `
        <h2>Payment Successful</h2>
        <p>Order ID: ${orderId}</p>
        <p>Payment ID: ${paymentId}</p>
        <p>Amount: ₹${amount / 100}</p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Could not send email",
    });
  }
};


// // ================= CAPTURE PAYMENT =================
// exports.capturePayment = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const userId = req.user.id;

//     if (!courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Course ID is required",
//       });
//     }

//     const courseDetails = await Course.findById(courseId);
//     if (!courseDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     const uid = new mongoose.Types.ObjectId(userId);
//     if (courseDetails.studentsEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "User already enrolled",
//       });
//     }

//     const options = {
//       amount: courseDetails.price * 100,
//       currency: "INR",
//       receipt: Date.now().toString(),
//       notes: {
//         courseId,
//         userId,
//       },
//     };

//     const paymentResponse = await razorpayInstance.orders.create(options);

//     return res.status(200).json({
//       success: true,
//       courseName: courseDetails.courseName,
//       thumbnail: courseDetails.thumbnail,
//       orderId: paymentResponse.id,
//       amount: paymentResponse.amount,
//       currency: paymentResponse.currency,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= VERIFY SIGNATURE =================
// exports.verifySignature = async (req, res) => {
//   try {
//     const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "12345678";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature !== digest) {
//       return res.status(400).json({
//         success: false,
//         message: "Signature mismatch",
//       });
//     }

//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     const enrolledCourse = await Course.findByIdAndUpdate(
//       courseId,
//       { $push: { studentsEnrolled: userId } },
//       { new: true }
//     );

//     const enrolledStudent = await User.findByIdAndUpdate(
//       userId,
//       { $push: { courses: courseId } },
//       { new: true }
//     );

//     await mailSender(
//       enrolledStudent.email,
//       "Course Enrollment Successful",
//       `You are enrolled in ${enrolledCourse.courseName}`
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified & course enrolled",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
