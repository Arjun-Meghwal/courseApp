const course=require("../models/course");
const tag=require("../models.tag");
const user=require("../models/user");
const {uploadImageCloudinary}=require("../utils/imageUpload");
const { isInstructor } = require("../middlewares/auth");

// create course handler function
exports.createCourse=async(req,res)=>{
  try{
    //  data fetch
    const {courseName,courseDescription,
      whatYouWillLearn,price,tag
    }=req.body;

    //get thumbnail
    const thumbnail=req.files.thumbnailImage;

    // validation
    if(!course || !courseDescription
      || !whatYouWillLearn ||price ||tag 
    ||thumbnail){
      return res.status(400).json({
        success:false,
        message:'all fields are required',
      });
    }

    // cheack for Instructor
    const userId=req.user.id;
    const instructorDetails=await user.findById(userId);
    console.log("Instructor details",instrucotDetails);

    if(!instructorDetails){
      return res.status(400).json({
        success:false,
        message:'instructor details is not found'
      });
    }
    //check given tag is valid or not
 const tagDetails=await tag.findBYId(tag);
 if(!tagDetails){
   return res.status(400).json({
     success: false,
     message: 'tag details is not found'
   }); 
 }

//  upload image cloudinary
const thumbnailImage=await uploadImageCloudinary(thumbnail,process.env.FOLDER_NAME);


//create an entry for new course
const newCourse=await course.create({
  coursName,
  courseDescription,
  instructor:instructorDetails._id,
  whatYouWillLearn:whatYouWillLearn,
  price,
  tag:tagDetails,
  thumbnail:thumbnailImage.secure_url,
});

//add new course new schema user update
await user.findByIdAndUpadate(
  {
    _id:instructorDetails._id
  },
  {
    $push:{course:newCourse._id,}
  },
  {new:true},
);
//upgarde thr tag Sxhema

return res.status(200).json({
  success:true,
  message:"course created successfully",
  data:newCourse,
});
  }
  catch(error){
    return res.status(401).json({
      success:false,
      message:'failed added course',
    })
  }
};


// getall course
exports.showAllCourse=async(req,res)=>{
  try{
const allCourse=await Course.find({},{
  courseName:true,
  price:true,
  instructor:true,
  thumbnail:true,
  ratingAndReviews:true,
  studentEnrolled:true,
})
.populate("instructor")
.exit();   
    return res.status(200).json({
      success: true,
      message: " all course   course ",
      data: newCourse,
    });
  }
  catch(error){
    return res.status(401).json({
      success: false,
      message: 'failed added course',
      message:error.message,
    })
  }
}