const Profile = require("../models/Profile");
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, gender } = req.body;
    const user = await User.findById(req.user.id);
    const profile = await Profile.findById(user.additionalDetails);

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    await profile.save();

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

exports.updateProfilePicture = async (req, res) => {
  const image = req.files?.profileImage;
  if (!image) return res.status(400).json({ success: false });

  const upload = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { image: upload.secure_url },
    { new: true }
  );

  res.json({ success: true, image: user.image });
};

exports.deleteAccount = async (req, res) => {
  const user = await User.findById(req.user.id);
  await Profile.findByIdAndDelete(user.additionalDetails);
  await User.findByIdAndDelete(req.user.id);
  res.json({ success: true });
};

exports.getAllUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id).populate("additionalDetails");
  res.json({ success: true, user });
};

exports.getEnrolledCourses = async (req, res) => {
  const user = await User.findById(req.user.id).populate("courses");
  res.json({ success: true, courses: user.courses });
};