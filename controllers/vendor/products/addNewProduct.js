const {
  checkImageMime,
  checkImageSize,
  cloudinaryConfig,
  unlinkFile,
} = require("../../../utils/index");
const Product = require("../../../models/Product");
const Galary = require("../../../models/Galary");
const ProductCategory = require("../../../models/ProductCategory");
const ProductBrand = require("../../../models/ProductBrand");
const addNewProduct = async (req, res, next) => {
  const { data } = req.body;

  try {
    const findedCategory = await ProductCategory.findOne({
      name: data.category,
    });

    if (!findedCategory) {
      const error = new Error("the provided category is not exist");
      error.statusCode = 400;
      throw error;
    }

    const findedBrand = await ProductBrand.findOne({
      name: data.brand,
    });
    if (!findedBrand) {
      const error = new Error("the provided brand is not exsit");
      error.statusCode = 400;
      throw error;
    }

    const newProduct = new Product({
      data: data,
      image: data.fileCode,
    });

    const savedProduct = await newProduct.save();
    findedBrand.product.push(savedProduct._id);
    findedCategory.product.push(savedProduct._id);
    await findedBrand.save();
    await findedCategory.save();
    await Promise.all(
      data.fileCode.map(async (item) => {
        const findedGalary = await Galary.findById(item);
        findedGalary.product = savedProduct._id;
        await findedGalary.save();
      })
    );
    res
      .status(200)
      .json({ message: "new product created successfully", status: true });
    // unlinkFile(req.files);
  } catch (error) {
    next(error);
  }
};
module.exports = addNewProduct;
