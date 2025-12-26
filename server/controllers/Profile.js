const profile=require("../models/profile");
const user=require("../models/user");


exports.updateProfile=async(req,res)=>{
  try{
    //get data
    const {dataOfBirth="",about="",constNumber,gender}=req.body;

    //get userId
    const id=req.user.id;
    //validation
    if(!contactNumber || !gender ||!id){
      return res.status(400).json({
        success:false,
        message:'All fields are required',
      });
    }
    //find profile
    const userDetails=await user.findById(id);
    const profileId=userDetails.additionalDetails;
    const profileDetails=await profile.findById(profileId);

    //update profile
    profileDetails.dateOfBirth=dataOfBirth;
    profileDetails.about=about;
    profileDetails.contactNumber=contactNumber;
    await profileDetails.save();

    //return response
    return res.status(200).json({
      success:true,
      message:'update profile successfully',
    });

  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:'not update profile',
    });
  }
};


// delete account
exports.deleteAccount=async(req,res)=>{
  try{
    // get id 
    const id=req.user.id;

    // validation 
    const userDetails=await user.findById(id);
    if(!userDetails){
      return res.status(404).json({
        success:false,
        message:'user not found',
      });
    }

    // delete profile 
    await profile.findByIdAnDelete({_id:userDetails.additionalDetails});
     
    //todo hw uneroll user from all enrolled course
    
    // delete user 
    await user.findByIdAnDelete({_id:id});

    return res.status(200).json({
      success:true,
      message:"user deleted successfilly",
    });
  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:'delete account successfully',
    });
  }
};

exports.getAllUserDetails=async(req,res)=>{
  try{
    //get id
    const id=req.user.id;
    // validation and get user details 
    const userDetails=await user.findById(id).populate("addtionalDetails").exect();

    // return response 
    return res.status(200).json({
      success:true,
      message:'user data fetched successfully',
    });
  }
  catch(error){
    return res.status(400).json({
      success:false,
      message:'does not found user details'
    })

  }

}
const User = require("../models/user");

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("courses")
      .exec();

    res.status(200).json({
      success: true,
      enrolledCourses: user.courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
