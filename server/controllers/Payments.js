const Razorpay = require("razorpay");
const { instance } = require("../config/razorpay");
const course = require("../models/course");
const user = require("../models/user");
const { default: mongoose } = require("mongoose");
const { default: orders } = require("razorpay/dist/types/orders");
const crypto = require("crypto");

// capture the payment and initiate Razorpay 
exports.capturePayment = async (req, res) => {
  try {
    // get course id and user id 
    const { course_Id } = req.body;
    const userId = req.user.id;

    // validation 
    if (!course_Id) {
      return res.status(400).json({
        success: false,
        message: "correct course id not given",
      });
    }

    // valid course details 
    let courseDetails;
    try {
      courseDetails = await course.findById(course_Id);
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: "could not find the course",
        });
      }

      // user already paid for this course 
      const userid = new mongoose.Types.ObjectId(userId);
      if (courseDetails.studentsEnrolled.includes(userid)) {
        return res.status(200).json({
          success: false,
          message: "student is already enrolled",
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    const amount = courseDetails.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_Id,
        userId,
      },
    };

    try {
      // initiate the payment using Razorpay 
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        courseName: courseDetails.courseName,
        courseDescriptions: courseDetails.courseDescriptions,
        thumbnail: courseDetails.thumbnail,
        orderId: paymentResponse.id,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "could not initiate order",
      });
    }
    // order created 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verify signature of Razorpay 
exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("payment is authorised");

    const { courseId, userId } = req.body.payload.payment.entity.notes;
    try {
      // fulfill the action
      const enrolledCourse = await course.findOneAndUpdate(
        {
          _id: courseId,
        },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "course not found",
        });
      }
      console.log(enrolledCourse);

      // find the student
      const enrolledStudent = await user.findOneAndUpdate(
        { _id: userId },
        { $push: { course: courseId } },
        { new: true }
      );
      console.log(enrolledStudent);

      // mail send confirmation
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "congratulations on your new course"
      );
      console.log(emailResponse);

      return res.status(200).json({
        success: true,
        message: "signature verified and course added",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "signature not verified",
    });
  }
};
