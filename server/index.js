const express=require("express");
const app=express();

const useRoures=require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const useRoures = require("dotenv");
const { Router } = require("express");

dotenv.config();
const PORT=process.env.PORT || 4000;

//data base connected
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:"http://localhost:3000",
    credentials:true,
  })
)
app.use(
  fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
  })
)

// cloudinaryConnect
cloudinaryConnect();

//  Routers
app.use("/api/v1/auth",useRoutes);
app.use("api/v1/profile", profileRoutes);
app.use("api/v1/course",courseRoutes);
app.use("api/v1/payments", paymentRoutes);

//def route
app.get("/",(req,res)=>{
  return res.json({
    message:'your server is running'
  });
})