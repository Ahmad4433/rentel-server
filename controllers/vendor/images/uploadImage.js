const Galary = require("../../../models/Galary");
const {
  checkImageSize,
  checkImageMime,
  cloudinaryConfig,
} = require("../../../utils/index");
const uploadImage = async (req, res, next) => {
  try {
    checkImageMime(req.files);
    checkImageSize(req.files);
    const result = await cloudinaryConfig(req.files);

    const newImages = new Galary({
      image: result.map((item) => item.secure_url),
    });
    const savedImages = await newImages.save();
    res.status(200).json({
      message: "images upload successfully",
      id: savedImages._id,
      status: true,
      url: result[0].secure_url,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadImage;
