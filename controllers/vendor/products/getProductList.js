const Product = require("../../../models/Product");
const getProductList = async (req, res, next) => {
  const page = req.query.page;
  const pageLimit = 10;
  try {
    const list = await Product.find()
      .sort({ _id: -1 })
      .skip((page - 1) * pageLimit)
      .limit(pageLimit);

    const formatedList = list.map((item) => {
      return { ...item._doc };
    });

    res.status(200).json({ message: "success", status: true, list });
  } catch (error) {
    next(error);
  }
};

module.exports = getProductList;
