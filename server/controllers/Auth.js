const user=require("../models/user");
const otp=require("../models/otp");
const otpGenerator=require("otp-generator");
const bycrpt=require("bycrpt");
const jwt=require("jesonwebtoken");
const dotenv=require("dotenv");

//sendotp
exports.sendOtp=async(req,res)=>{
  try{
  // fetch email from request body
  const {email}=req.body;

  // check user already exit or not
  const checkUserPresent=await user.findOne({e,ail});

  // if user already exit then return a response
   if(checkUserPresent){
    return res.status(401).json({
      success:false,
      message:'user already registered',
    })
   }
  //generate otp
  var otp=otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
  });
  console.log("otp generated ",otp);

  //check unique otp or not 
  const result=await otp.findOne({otp:otp});
  while(result){
    otp=otpGenerator(6,{
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    result=await otp.findOne({otp:otp});
  }
  const otpPayload={email,otp};

  //create entry for otp
  const otpBody=await otp.create(otpPayload);
  console.log(otpBody);

  //return response success 
  res.status(200).json({
    success:true,
    message:true,
    message:'otp sent successfully',
    otp
  })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:'otp sent feaild'
    })

  }

   
};


//signup
exports.signup=async(req,res)=>{
try{
  // data fetch from request body
  const {
    firstName,
    lastName,
    email,
    password,
    accountType,
    confirmPassword,
    otp
  }=req.body;

  // validation
  if(!firstName || !lastName ||!email ||!password||!confirmPassword||!otp){
    return res.status(400).json({
      success:false,
      message:'all fields are required',
    });
  }
  // 2 password match 

  if(password!==confirmPassword){
    return res.status(400).json({
      success:false,
      message:'password and confirmpassword value does not match'
    });
  }
  // check user already exit
  const exitingUser=await user.findOne({email});
  if(exitingUser){
    return res.status(400).json({
      success:false,
      message:'user is already registred'
    });
  }
  // find most recent otp 
  const recentOtp=await otp.find({eamil}).sort({createAt:-1}).limit(1);
  console.log(recentOtp);
  // validate otp
  if(recentOtp.length==0){
   return  res.status(400).json({
      success:false,
      message:'otp does not match',
    });
  }
  else if(otp!==recentOtp){
    return res.status(400).json({
      success:false,
      message:"invalid otp",
    });
  }
  // hash password
  const hashedPassword =await bycrpt.hash(password,10);

  //entry create in db
  const profileDetails=await profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contactNumber:null,

  });
  const user=await user.create({
    firstName,
    lastName,
    email,
    contactNumber,
    password:hashedPassword,
    accountType,
    additionalDetails:profileDetails_id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
  })
  // return re
  return res.status(200).json({
    success:true,
    message:'user is registred successfully',
    user,
  });
}
catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:"user cannot be registred please try again",
  });

}

}

//login

exports.login=async (req,res) => {
  try{
// get data from req body
const {email,password}=req.body;
// validation data
if(!email || !password){
  return res.status(403).json({
    success:false,
    message:'all feilds are required please try again',
  }); 
}
// user check exit or not 
const user=await user.findOne({email}).populate("additionalDetails");
if(!user){
  return res.ststus(401)({
    success:false,
    message:"user is not registred please signup fisrt",
  });
}
// generate jwt after password match 
if(await bycrpt.compare(password,user.password)){
  const payload={
    email:user.email,
    id:user._id,
    role:user.role,
  }
  const token=jwt.sign(playload,process.env.JWT_SECRET,{
    expiresIn:"2h",
  });
  user.token=token;
  user.password=undefined; 

// create cookie 
const options={
  options:new Date(Date.now()+3*34*60*60*1000),
  httpOnly:true,
}
res.cookie("token",token,option).status(200).json({
  success:true,
  token,
  user,
  message:'login in successfully'
});
}
  else{
    return res.status(400).json({
      success:false,
      message:"password is incorrect",
    })
  }
  }
  catch(error){
    console.log(error);
    return res.status(400).json({
      success:false,
      message:'login failure try again',
    });

  }
};

//changepassword
exports.changePassword=async(req,res)=>{
  

}