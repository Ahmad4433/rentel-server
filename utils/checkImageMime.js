const checkImageMime = (files) => {
    files.forEach((file) => {
      if (
        !(
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/jpg"
        )
      ) {
        const error = new Error("File should be in PNG or JPG format");
        error.statusCode = 400;
        throw error;
      }
    });
  };
  
  module.exports = checkImageMime;
  