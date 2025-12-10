const mongoose=require("mongoose");
const { resetPasswordToken } = require("../controllers/ResetPassword");

const useSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  accountType:{
    type:String,
    enum:["Admin","Student","Instructor"],
    required:true
  },
  additionaldetails:{
    type:mongoose.Schema.ObjectId,
    ref:"profile"
  },
  course:[
    {
      type:mongoose.Schema.ObjectId,
      ref:"course"
    }
  ],
  image:{
    type:String,
    required:true
  },
  toke:{
    type:String
  },
  resetPasswordExpires:{
    type:Date,
  },
  courseProgress:[
    {
    type:mongoose.Schema.ObjectId,
    ref:"courseProgress"
  }
],
});
module.exports=mongoose.model("user",userSchema);