const Section = require("../models/Section");
const Course = require("../models/Course");
const { findByIdAndUpdate } = require("../models/SubSection");
exports.createSection=async(req,res)=>{
  try{
    // data fecth
    const {sectionName,courseId}=req.body;
    // data validation 
if(!sectionName || !courseId){
  return res.status(400).json({
    success:false,
    message:'requirde all data',
  });
}
    // create section
    const newSection = await Section.create({
    sectionName,
      course: courseId,
});
    // update course with section objects
    const updateCourse=await  Course.findByIdAndUpdate(
      courseId,{
        $push:{

        courseContent:newSection._id,
        }
      },
      {new:true},
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });
    // return response
    return res.status(200).json({
      success:true,
      message:'section created successfully',
      data: updateCourse,
    });

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"section is not created",
    });

  }
};

// section updated 
exports.updateSection = async (req, res) => {
  try {

    const { sectionName, sectionId, courseId } = req.body;

    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      data: updatedCourse,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// section delete by id 
exports.deleteSection=async(req,res)=>{
  try{
// get id assuming that we are sending id params 
const {sectionId}=req.params;

// use findByIdDelete
    await Section.findByIdAndDelete(sectionId);
//todo do we need to delete the entry from the course 
// return response 
return res.status(200).json({
  success:true,
  message:"selection deleted by successfully",
});

  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:'unable to delete section please try again',
      error:error.message,
    });
  }
};