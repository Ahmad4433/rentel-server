const Product = require("../../../models/Product");
const checkOfferValidity = require("../../../utils/calculateOfferValidity");
const getProductList = async (req, res, next) => {
  const page = req.query.page;
  const pageLimit = 10;
  try {
    const list = await Product.find()
      .sort({ _id: -1 })
      .skip((page - 1) * pageLimit)
      .limit(pageLimit);

    const formatedList = list.map((item) => {
      const { isOfferValid, discountAmount, offerPrice, offerEndDate } =
        checkOfferValidity(item.data);

      return {
        ...item._doc,
        offer_price: isOfferValid ? offerPrice : null,
        isOffer_valid: isOfferValid,
        offer_end_date: offerEndDate,
        discount_amount: discountAmount,
      };
    });

    res
      .status(200)
      .json({ message: "success", status: true, list: formatedList });
  } catch (error) {
    next(error);
  }
};

module.exports = getProductList;
