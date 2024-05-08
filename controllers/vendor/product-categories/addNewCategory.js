const ProductCategory = require("../../../models/ProductCategory");
const {
  checkImageMime,
  checkImageSize,
  cloudinaryConfig,
  unlinkFile,
} = require("../../../utils/index");
const joi = require("joi");
const addNewCategory = async (req, res, next) => {
  const { error: validationError } = validateCategory(req.body);
  const { name } = req.body;
  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const findedCategory = await ProductCategory.findOne({ name: name });
    if (findedCategory) {
      const error = new Error("this category is already exist");
      error.statusCode = 400;
      throw error;
    }

    checkImageMime(req.files);
    checkImageSize(req.files);

    const result = await cloudinaryConfig(req.files);
    const newCategory = new ProductCategory({
      name: name,
      image: result[0].secure_url,
    });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "category added successfully", status: true });
    // unlinkFile(req.files);
  } catch (error) {
    next(error);
    // unlinkFile(req.files);
  }
};
module.exports = addNewCategory;

function validateCategory(data) {
  const categorySchema = joi.object({
    name: joi.string().required(),
  });

  return categorySchema.validate(data);
}
