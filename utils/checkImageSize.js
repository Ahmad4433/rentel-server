const checkImageSize = (files) => {
    files.forEach((file) => {
      if (file.size >= 1024 * 1024 * 3) {
        const error = new Error("File size should be less than 3MB");
        error.statusCode = 400;
        throw error;
      }
    });
  };
  
  module.exports = checkImageSize;
  