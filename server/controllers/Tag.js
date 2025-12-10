const tag=require("../models/tag");

// create tag handler function
exports.createTage=async(req,res)=>{
  try{

    // fetch data
    const {name,description}=req.body;

    // validation
    if(!name || !description){
      return res.status(400).json({
        success:false,
        message:'all fields are required'
      })
    }
// creat entry db
const tagDetails=await tag.create({
  name:name,
  description:description,
});
consile.log(tagDetails);

return res.status(200).json({
  success:true,
  message:"tag creates successfully",
})
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
};

// get all tag
exports.showAlltag=async(req,res)=>{
  try{
    const allTags=await tag.find({},{name:true,description:true});
    res.status(200).json({
      success:true,
      message:'all tag are returned successfully',
      allTags,
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}