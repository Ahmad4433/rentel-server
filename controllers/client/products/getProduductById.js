const Product = require("../../../models/Product");
const Review = require("../../../models/Review");
const getProductById = async (req, res, next) => {
  const checkOfferValidity = require("../../../utils/calculateOfferValidity");
  const productId = req.query.id;
  try {
    const findedProduct = await Product.findById(productId).populate([
      {
        path: "image",
      },
      {
        path: "review",
        select: "-product",
        populate: {
          path: "user",
          select: "address.firstName address.lastName profile",
        },
      },
    ]);

    const { isOfferValid, discountAmount, offerEndDate, offerPrice } =
      checkOfferValidity(findedProduct.data);
    const formatedProduct = {
      ...findedProduct._doc,
      isOfferValid,
      discountAmount,
      offerEndDate,
      offerPrice,
      isNew:
        Date.now() - new Date(findedProduct.createdAt).getTime() <=
        7 * 24 * 60 * 60 * 1000,
    };

    res
      .status(200)
      .json({ messsage: "success", status: true, product: formatedProduct });
  } catch (error) {
    next(error);
  }
};

module.exports = getProductById;
