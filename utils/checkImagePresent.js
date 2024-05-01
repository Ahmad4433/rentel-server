const checkImagePresent = (req, res, next) => {
  try {

    if (!req.files || req.files.length < 1 || req.files.length > 4) {
      const error = new Error("Please provide images between 1 to 4");
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = checkImagePresent;
