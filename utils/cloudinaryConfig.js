const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = async (files) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(file.buffer);
    
      });
    });

    const result = await Promise.all(uploadPromises);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = cloudinaryConfig;
