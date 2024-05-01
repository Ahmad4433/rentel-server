const ProductCategory = require("../../../models/ProductCategory");
const getCategoryList = async (req, res, next) => {
  try {
    const list = await ProductCategory.find().select("-product");
    res.status(200).json({ message: "success", status: true, list });
  } catch (error) {
    next(error);
  }
};

module.exports = getCategoryList;
