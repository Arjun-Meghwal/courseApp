const user=require("../models/user");
const mailSender=require("../utils/mailSender");

// resetpassword
exports.resetPasswordToken=async(req,res)=>{
  try{
  // get email from req body
  const email=req.body.email;
  // check user for this emails validtion
  const user =await user.findOne({emial:emial});
  if(!user){
    return res.json({success:false,
      message:'your email is not registred with us'
    })

  }
  //generate tokem 
  const token=crypto.randomUUID();
// generate user by adding token and expiration
const updateDetails=await user.findOneAndUpdate(
  {email:email},
  {
    token:token,
    resetPasswordExpires:Date.now()+5*60*1000,
  },
{new:true});

// create url 
  const url = `http.//localhost:3000/update-paswword/${token}`
// send mail conatin get the url
await mailSender(email,"password reset link",
  `"password reset link:${url}"`
);
// retur response 
return res.json({
  success:true,
  message:"email successfully please check email change password",
});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
    success:false,
    meassage:'somthing went wrong whilw reset'
    });
  }
  
}
exports.resetPassword=async(req,res)=>{
  try{
//data fetch
const{password,confirmPassword,token}=req.body;
//validation
if(password!==confirmPassword){
  return res.json({
    success:false,message:'password not matching',
  });
}
//get userdetails from db uding token
const userdetails=await user.findOne({token:token});
//if no entry invalid token
if(!userdetails){
  return res.json({
    success:false,
    message:"token is invalid",
  });
}
// token time check 
if(userdetails.resetPasswordExpires<Date.now()){
  return res.json({
    success:false,
    message:'token is expired please regenerate your token'
  })
}
//hash password
const hashedPassword=await bycrpt.hash(password,10);

//password upadate
await user.findOneAndUpdate(
  {token:token},
  {password:hashedPassword},
  {new:true}, 
)
return res.json({
  success:true,
  message:'password reset successful'
})
  }
  catch(error){
    console.log(erro);
    return res.status(500).json({
      success:false,
      message:'somthing went wrong while sending reset password mail'
    })
    

  }
}