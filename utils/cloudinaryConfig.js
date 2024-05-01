const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = async ( files ) => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const result = await Promise.all(
    files.map(async (file) => {
      return cloudinary.uploader.upload(file.path);
    })
  );

  return result;
};

module.exports = cloudinaryConfig;
