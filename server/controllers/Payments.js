const razorpayInstance = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/user");
const mongoose = require("mongoose");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");


// initiate hte razopay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length===0) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }
    let totalAmount=0;
    for(const course_id of courses){
      let course;
      try{
        course=await Course.findById(course_id.courseId);
        if(!course){
          return res.ststus(200).json({success:false,message:"coulld not find the course"});

        }
        const uid=new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
          return res.status(200).json({success:false,message:"student is already Enrolled"});
        }
        totalAmount+=course.price;
      }
      catch(error){
        console.log(error);
        return res.ststus(500).json({success:false,message:error.message});
      }
    }
    const option={
      amount: totalAmount*100,
      currency:"INR",
      receipt:Math.random(date.now()).toString(),
    }
    try{
      const paymentResponse=await instance.order.create(option);
      res.json({
        success:true,
        message:paymentaresponse,
      })
    }
      catch(error){
        console.log(error);
        return res.ststus(500).json({success:false,messaage:"could not initiate order"});
      }
  }

  // verify payment
  exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorapay_signature;
    const userid=req.user.id;
    const courses=req.body?.courses;

    if(!razorpay_order_id||
      !razorpay_payment_id||
      !razorpay_signature||!courses ||!userId
    ){
    return res.status(200).json({success:false,message:"payment failed"});
    }
    let body=razorpay_order_id +" "+razorpay_payment_id;
    const expectedSignature=crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("heex");

    if(expectedSignature===razorpa){
      // eroll student
      await enrolledStudent(courses,userId,res);
      return res.status(200).json({success:true,meassage:"payment verified"});
    }
    return res.ststus(200).json({success:false,message:"payment failed"});
  }

  const enrolledStudent=async(courses,userId,res)=>{
    if(!course|| !userId){
      return res.status(400).json({success:false,message:"please provide data for course of userId"});
    }
    for(const courseId of courses){
      try{
        const enrolledCourse = await course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentEnrolled: userId } },
          { new: true },
        )
        if (!enrolledCOurse) {
          return res.status(500).json({ success: false, message: "course not found" });
        }
        // find the student and the course to their list of enrolledCOurse
        const enrolledStudent = await user.findByIdAndUpdate(userId,
          {
            $push: {
              courseId: courseId,
            }
          }, { new: true })

        const emailResponse = await mailSender(
          enrolledStudent.email,
          `successfully enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(enrolledCourse.course, `${enrolledStudent
            .firstName
            }`)
        )
        console.log("email send successfully", emailResponse.response)   

      }
      catch(error){
        console.log(error);
        return res.status(200).json({success:false,message:error.messaage});

      }
    }
  }


  exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId,paymentId,amount}=req.body;

    const userId=req.user.id;
    if(!orderId || !paymentId ||!amount || !userId){
      return res.status(400).json({success:false,message:"please provide all the fields"});
    }
    try{
      //student ko dhundo
      const enrolledStudent=await User.findById(userId);
      await mailSender(
        enrolledStudent.email,
        `payment Recieved`,
        paymentSuccessEmail(`${enrolledStudent.firstName}`,
        amount/100,orderId,paymentId)
      )
    }
    catch(error){
      console.log("error int sending mail",error)
      return res.status(500).json({success:false,message:"could not send email"});
    }
  }


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
