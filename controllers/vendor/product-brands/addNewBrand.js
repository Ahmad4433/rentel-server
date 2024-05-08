const ProductBrand = require("../../../models/ProductBrand");
const {
  checkImageMime,
  checkImageSize,
  cloudinaryConfig,
  unlinkFile,
} = require("../../../utils/index");
const joi = require("joi");
const addNewBrand = async (req, res, next) => {
  const { error: validationError } = validateBrand(req.body);
  const { name } = req.body;
  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const findedBrand = await ProductBrand.findOne({ name: name });
    if (findedBrand) {
      const error = new Error("this brand is already exist");
      error.statusCode = 400;
      throw error;
    }

    checkImageMime(req.files);
    checkImageSize(req.files);
    const result = await cloudinaryConfig(req.files);
    const newBrand = new ProductBrand({
      name: name,
      image: result[0].secure_url,
    });
    await newBrand.save();

    res.status(201).json({ message: "brand added successfully", status: true });
    // unlinkFile(req.files);
  } catch (error) {
    next(error);
    // unlinkFile(req.files);
  }
};
module.exports = addNewBrand;

function validateBrand(data) {
  const brandSchema = joi.object({
    name: joi.string().required(),
  });

  return brandSchema.validate(data);
}
