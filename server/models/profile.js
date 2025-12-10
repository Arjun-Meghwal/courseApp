const mongoose=require("mongoose");
 
const userprofile=new mongoose.Schema({
  gender:{
    types:String,
  },
  dataofBirth:{
    type:String
  },
  about:{
    type:String,
    trim:true
  },
  countactNumber:{
    type:Number,
    trim:true
  }
});
module.exports=mongoose.model("profile",profileShema);