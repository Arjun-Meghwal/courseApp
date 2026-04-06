const mongoose=require("mongoose");
const subSection = require("./SubSection");
const sectionSchema=new mongoose.Schema({
  sectionName:{
    type:String
  },
  subSection:[
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"subSection",
    }
  ],
});
module.exports=mongoose.model("section",sectionSchema);