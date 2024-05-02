const Product = require("../../../models/Product");
const calculateValidity = require("../../../utils/calculateOfferValidity");
const getProductByFilter = async (req, res, next) => {
  const page = req.query.page;
  const limit = 25;
  const { filter } = req.body;

  try {
    const findedProducts = await Product.find(filter ? filter : null)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });

    const formatedList = findedProducts.map((item) => {
      const { isOfferValid, discountAmount, offerEndDate, offerPrice } =
        calculateValidity(item?.data);

        return {
            ...item._doc,
            isOfferValid: isOfferValid,
            discountAmount: discountAmount,
            offerEndDate: offerEndDate,
            offerPrice: offerPrice,
            isNew: Date.now() - new Date(item.createdAt).getTime() <= 7 * 24 * 60 * 60 * 1000
        };
        
    });

    


    res
      .status(200)
      .json({ message: "success", status: true, list: formatedList });
  } catch (error) {
    next(error);
  }
};

module.exports = getProductByFilter;
