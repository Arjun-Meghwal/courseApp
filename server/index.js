require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactRoutes=require("./routes/ContactUs")
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const aiRoutes = require("./routes/AI");
dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connect
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.5.138:3000",
    ],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/ai", aiRoutes);
// require("dotenv").config();


console.log("MAIL_USER =", process.env.MAIL_USER);
console.log("CONTACT_MAIL =", process.env.CONTACT_MAIL);
// Default Route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

// //google setuap
// const passport = require("passport");

// require("./config/passport");

// app.use(passport.initialize());
// app.use(passport.session());

//cart add
const cartRoutes = require("./routes/Cart");

app.use("/api/v1/cart", cartRoutes);