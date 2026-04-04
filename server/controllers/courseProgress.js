exports.updateCourseProgress = async (req, res) => {
     const {courseID,subSectionID,sectionID}=req.body;
     const userID=req.user.id;
  try{
    //check if the subsection is valid
    const subSection=await SubSection.findById(subSectionId);
    if(!subSection){
      return res.status(404).json({error:"Invalid Subsection"})
    }
    // check for old entry
    let courseProgress=await courseProgress.findById({
      courseId:courseID,
      userId:userID,
    })
    if(!courseProgress){
      return res.status(404).json({
        success:false,
        message:"course progress does not exit"
      });
    }
    else{
      //check for re-completing video
      if(courseProgress.completedVideos.includes(subSectionID)){
        return res.status(400).json({
          success:false,
          message:"Video already completed"
        });
      }
      //poush into complete video
      courseProgress.completedVideos.push(subSectionID);
    }
    await courseProgress.save();
  }
  catch(error){
    console.error(error);
    return res.status(400).json({
      success:false,
      message:"internal server error"
    })
  }
}