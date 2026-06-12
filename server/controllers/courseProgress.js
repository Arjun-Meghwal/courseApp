const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    // Validation
    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check subsection exists
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Invalid SubSection",
      });
    }

    // Find course progress
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    // Create progress if not exists
    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [subSectionId],
      });

      return res.status(200).json({
        success: true,
        message: "Lecture marked as complete",
        data: courseProgress,
      });
    }

    // Check already completed 
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(400).json({
        success: false,
        message: "Video already completed",
      });
    }

    // Add completed video
    console.log("CREATE DATA => ", {
      courseId,
      userId,
      completedVideos: [subSectionId],
    });
    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    console.log("AFTER SAVE => ", courseProgress);
    return res.status(200).json({
      success: true,
      message: "Lecture marked as complete",
      data: courseProgress,
    });
  } catch (error) {
    console.error("UPDATE COURSE PROGRESS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};