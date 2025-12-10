const jwt=require("jesonwebtoken");
require("dotenv").config();
const user=require("../models/user");
//auth
exports.auth=async(req,res,next)=>{
  try{
    const token=req.cookies.token 
    || req.boy.token 
    || req.header("authourisatoin").replace("beare ","");
  
  if(!token){
    return res.staus(401).json({
      success:false,
      message:'token is missing'
    });
  }
  // verify token
  try{
    const decode=await jwt.verify(token,process.env.JWTSECRET);
    console.log(decode);
    req.user=decode;
  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:'token is invalid',
    });
  }
  next();
  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:'somthing went wrong velidatin the token'
    });
  }
}
//isStudent
exports.isStudent=async(req,res,next)=>{
  try{
    if(req.user.accountType!=='Student'){
      return res.ststus(401).json({
        success:false,
        message:'this is protectes route for stuent only',
      });
    }
next();
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:'user role cannot verified',
    })
  }
}
//isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== 'Instructor') {
      return res.ststus(401).json({
        success: false,
        message: 'this is protectes route for instructot only',
      });
    }
    next();
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'user role cannot verified',
    })
  }
}
//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== 'Admin') {
      return res.ststus(401).json({
        success: false,
        message: 'this is protectes route for admin only',
      });
    }
    next();
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'user role cannot verified',
    })
  }
}