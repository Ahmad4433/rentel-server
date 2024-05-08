const {
  checkImageMime,
  checkImageSize,
  cloudinaryConfig,
  unlinkFile,
} = require("../../../utils/index");
const Product = require("../../../models/Product");
const ProductCategory = require("../../../models/ProductCategory");
const ProductBrand = require("../../../models/ProductBrand");
const addNewProduct = async (req, res, next) => {
  const { data } = req.body;
  const formatedData = JSON.parse(data);

  try {
  const findedCategory = await ProductCategory.findOne({
    name: formatedData.category,
  });
 
  if (!findedCategory) {
    const error = new Error("the provided category is not exist");
    error.statusCode = 400;
    throw error;
  }

  const findedBrand = await ProductBrand.findOne({ name: formatedData.brand });
  if (!findedBrand) {
    const error = new Error("the provided brand is not exsit");
    error.statusCode = 400;
    throw error;
  }

  checkImageMime(req.files);
  checkImageSize(req.files);
  const result = await cloudinaryConfig(req.files);

  const newProduct = new Product({
    data: JSON.parse(data),
    image: result.map((item) => item.secure_url),
  });
  const savedProduct = await newProduct.save();
  findedBrand.product.push(savedProduct._id);
  findedCategory.product.push(savedProduct._id)
  await findedBrand.save()
  await findedCategory.save()

  res
    .status(200)
    .json({ message: "new product created successfully", status: true });
  // unlinkFile(req.files);
  } catch (error) {
    next(error);
  }
};
module.exports = addNewProduct;
