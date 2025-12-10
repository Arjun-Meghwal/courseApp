const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(()=>console.log("data base connected"))
  .catch((error)=>{
    console.log("data base not connected");
    confirm.error(error);
    process.exit(1);
  })
};