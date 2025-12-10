const mongoose=require("mongoose");

const courseProgress=new mongoose.Schema({
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course", 
  },
  completedVideos:[
    {
      type:mongoose.Schema.ObjectId,
     ref:"subSection" 
    }
  ]
});
module.exports=mongoose.model("courseProgram",courseProgress);
