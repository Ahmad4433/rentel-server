const Image = require("../../../models/Images");
const {
  checkImageSize,
  checkImageMime,
  cloudinaryConfig,
  unlinkFile,
} = require("../../../utils/index");
const uploadImage = async (req, res, next) => {
  try {
    checkImageMime(req.files);
    checkImageSize(req.files);
    const result = await cloudinaryConfig(req.files);

    const newImages = new Image({
      imane: result.map((item) => item.secure_url),
    });
    const savedImages = await newImages.save();
    res
      .status(200)
      .json({ message: "images upload successfully", id: savedImages._id });
    unlinkFile(req.files);
  } catch (error) {
    next(error);
    unlinkFile(req.files);
  }
};

module.exports = uploadImage;
