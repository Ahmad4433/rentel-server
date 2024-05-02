const Product = require("../../../models/Product");
const {
  checkImageMime,
  cloudinaryConfig,
  checkImageSize,
  unlinkFile,
} = require("../../../utils/index");
const updateProduct = async (req, res, next) => {
  const { data } = req.body;
  const formatedData = JSON.parse(data);
  const productId = req.query.id;

  try {
    const findedProduct = await Product.findById(productId);
    if (!findedProduct) {
      const error = new Error("no product found");
      error.statusCode = 400;
      throw error;
    }

    let files;
    if (req.files?.length>0) {
      checkImageMime(req.files);
      checkImageSize(req.files);
      files = await cloudinaryConfig(req.files);
    }

    findedProduct.data = formatedData;
    findedProduct.image =
      req.files?.length > 0
        ? files.map((file) => file.secure_url)
        : findedProduct.image.map((item) => item);
    await findedProduct.save();
    res
      .status(200)
      .json({ message: "product updated successfully", status: true });
    unlinkFile(req.files);
  } catch (error) {
    next(error);
    unlinkFile(req.files);
  }
};

module.exports = updateProduct;
