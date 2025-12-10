const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    defualt:Date.now(),
    expires:5*60,
  }
});


// send mail
async function sendVerificationEmail(email,otp){
  try{
    const mailResponse=await mailSender(email,"verifiction email from studynotaion",otp);
    console.log("Email sent successfuly", mailResponse);
  }
  catch(error){
    console.log("Error ocuure Email sent ", error);
  }
}
otpSchema.pre("save",async function(next){
  await sendVerificationEmail(this,email,this.otp);
  next();

})
module.exports=monggoose.model("otp",otpSchema);