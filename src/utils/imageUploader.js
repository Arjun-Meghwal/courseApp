const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (
  file,
  folder,
  quality,
  height
) => {

  const options = {
    folder,
    resource_type: "auto",
    timeout: 600000,
  };

  if (quality) {
    options.quality = quality;
  }

  if (height) {
    options.height = height;
  }

  return await cloudinary.uploader.upload(
    file.tempFilePath,
    options
  );
};