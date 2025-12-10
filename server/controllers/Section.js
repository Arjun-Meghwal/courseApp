const section=require("../models/section");
const course=require("../models/course");
const { findByIdAndUpdate } = require("../models/subSection");
const section = require("../models/section");
const section = require("../models/section");

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
    const newSection=await section.create({sectionName});
    // update course with section objects
    const updateCourse=await  course.findByIdAndUpdate(
      courseId,{
        $push:{

        courseContent:newSection>_id,
        }
      },
      {new:true},
    )
    // return response
    return res.status(200).json({
      success:false,
      message:'section created successfully',
      updateCourseDetails,
    });

  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:"section is not created",
    });

  }
};

// section updated 
exports.updateSection=async(req,res)=>{
  try{
    // data Input 
    const { sectionName,sectionId}=req.body;
    // data validation 
    if(!section || !sectionId){
      return res.status(401).json({
        success:false,
        message:'update section required all data',
      });
    }
    // update data 
    const section=await section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
    // return res 
    return res.status(200).json({
      success:true,
      message:'suction update successfully'
    });
  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:'unable to update section please try again',
    });
  }
}


// section delete by id 
exports.deleteSection=async(req,res)=>{
  try{
// get id assuming that we are sending id params 
const {sectionId}=req.params;

// use findByIdDelete
await section.findByIdAndDelete(section);
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