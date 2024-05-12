const Product = require("../../../models/Product");
const deleteProduct = async (req, res, next) => {
  const productId = req.query.productId;
  try {
    const findedProduct = await Product.findById(productId);
    if (!findedProduct) {
      const error = new Error("no product found");
      error.statusCode = 400;
      throw error;
    }

    await Product.findByIdAndDelete(productId);
    res
      .status(200)
      .json({ message: "product deleted successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProduct;
