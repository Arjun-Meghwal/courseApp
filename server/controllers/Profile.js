const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      about,
      contactNumber,
      gender,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName },
      { new: true }
    );
    console.log("USER =>", JSON.stringify(user, null, 2));
    console.log("ADDITIONAL DETAILS =>", user?.additionalDetails);
    let profile = await Profile.findById(user.additionalDetails);

    if (!profile) {
      profile = await Profile.create({
        gender: "",
        dateOfBirth: "",
        about: "",
        contactNumber: "",
      });

      user.additionalDetails = profile._id;
      await user.save();
    }

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    await profile.save();
    console.log("PROFILE =>", profile);

    const updatedUser = await User.findById(req.user.id)
      .populate("additionalDetails");

    return res.json({
      success: true,
      user: updatedUser,
    });

  } catch (e) {

    console.error("UPDATE PROFILE ERROR", e);

    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateProfilePicture = async (req, res) => {

  try {

    const image = req.files?.profilePicture;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Profile picture missing",
      });
    }

    const upload = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { image: upload.secure_url },
      { new: true }
    );

    return res.json({
      success: true,
      image: user.image,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.deleteAccount = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    await Profile.findByIdAndDelete(user.additionalDetails);

    await User.findByIdAndDelete(req.user.id);

    return res.json({
      success: true,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getAllUserDetails = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .populate("additionalDetails");
console.log("user details",user)
    console.log(
      "GET USER =>",
      JSON.stringify(user, null, 2)
    );
    return res.json({
      success: true,
      user,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getEnrolledCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .lean();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    for (let course of userDetails.courses) {
      let totalLectures = 0;

      course.courseContent.forEach((section) => {
        totalLectures += section.subSection.length;
      });

      const courseProgress = await CourseProgress.findOne({
        courseId: course._id,
        userId: userId,
      });

      const completedLectures =
        courseProgress?.completedVideos?.length || 0;

      course.progressPercentage =
        totalLectures === 0
          ? 0
          : Math.round(
            (completedLectures / totalLectures) * 100
          );

      course.completedLectures = completedLectures;
      course.totalLectures = totalLectures;
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching enrolled courses",
      error: error.message,
    });
  }
};

// INSTRUCTOR DASHBOARD
exports.instructorDashboard = async (req, res) => {

  try {

    const id = req.user.id;

    const courseData = await Course.find({
      instructor: id,
    });

    const courseDetails = courseData.map((course) => {

      const totalStudents =
        course?.studentsEnrolled?.length;

      const totalRevenue =
        course?.price * totalStudents;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudents,
        totalRevenue,
        thumbnail: course.thumbnail,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Instructor Dashboard fetched successfully",
      data: courseDetails,
    });

  } catch (error) {

    console.log("INSTRUCTOR DASHBOARD ERROR", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};