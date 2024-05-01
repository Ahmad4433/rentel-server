const ProductBrand = require("../../../models/ProductBrand");
const getBrandList = async (req, res, next) => {
  try {
    const list = await ProductBrand.find().select("-product");

    res.status(200).json({ message: "success", status: true, list });
  } catch (error) {
    next(error);
  }
};

module.exports = getBrandList;
