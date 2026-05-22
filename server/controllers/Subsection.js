const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// CREATE SUBSECTION
exports.createSubSection = async (req, res) => {
  try {
    console.log("create subsection called");

    const { sectionId, title, description } = req.body;
    const video = req.files?.videoFile;

    console.log("body hai", req.body);
    console.log("files hai", req.files);

    if (!sectionId || !title || !video) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    // upload video
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // create subsection
    const subSectionDetails = await SubSection.create({
      title,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    // update section
    await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    );
    // console.log("UPDATED SECTION", updatedSection);
    // get updated course
    const sectionDetails = await Section.findById(sectionId);

    const updatedCourse = await Course.findOne({
      courseContent:sectionId,
    }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "subsection created successfully",
      data: updatedCourse,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

// UPDATE SUBSECTION
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title } = req.body;

    if (!subSectionId || !title) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      { title },
      { new: true }
    );
    console.log("UPDATED SECTION", updatedSubSection);

    return res.status(200).json({
      success: true,
      message: "subsection updated successfully",
      data: updatedSubSection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to update subsection",
    });
  }
};

// DELETE SUBSECTION
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;

    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "subsection deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to delete subsection",
    });
  }
};