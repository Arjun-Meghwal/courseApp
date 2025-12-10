const subSection=require("../models/subSection");
const section=require("../models/section");

// create subsection 
exports.createSubSection=async(req,res)=>{
  try{
    // fetch data 
    const {sectionId,title,timeDuration,description}=req.body;

    // extract file video 
    const video=req.files.videoFile;

    // validation
    if(!sectionId || !title || !timeDuration
      ||!video 
    ) {
      return res.status(400).json({
        success:false,
        message:'all fields are required',
      });
    }
// upload vedio cloudinary 
const uploadDetails=await uploadImageToCloudinary(video,process.eventNames.FOLDER_NAME);

// create a subSection 

const SubSectionDetails=await SubSection.create({
title:title,
timeDuration:timeDuration,
description:description,
videoUrl:uploadDetails.secure_uel,
});

// update section with this sub section objectId 
const updatedSection=await section.findByIdAndUpdate({_id:sectionId},
  {$push:{
    SubSection:SubSectionDetails._id,}
  },
  {new:true}
);

// return response 
return res.status(200).json({
  success:true,
  message:'subsection updated successfully',
})
  }
  catch(error){
return res.status(401).json({
  success:false,
  message:'internal server error',
  error:error.message,
});
  }
};


// update subsection 
exports.updateSubSection = async (req, res) => {
  try {
    // data Input 
    const { SubsectionName, SubsectionId } = req.body;
    // data validation 
    if (!subsection || !subsectionId) {
      return res.status(401).json({
        success: false,
        message: 'update subsection required all data',
      });
    }
    // update data 
    const subsection = await subsection.findByIdAndUpdate(subsectionId, { subsectionName }, { new: true });
    // return res 
    return res.status(200).json({
      success: true,
      message: 'subsuction update successfully'
    });
  }
  catch (error) {
    return res.status(401).json({
      success: false,
      message: 'unable to update subsection please try again',
    });
  }
};


// delete section
exports.deleteSubSection=async(req,res)=>{
  try{
// get id assuming that we are sending id params 
const {subsectionId}=req.params;

// use findByIdDelete
await subsection.findByIdAndDelete(subsection);
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
