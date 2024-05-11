const Cart = require("../../../models/Cart");
const User = require("../../../models/User");
const Product = require("../../../models/Product");
const checkOfferValidity = require("../../../utils/calculateOfferValidity");

const addToCart = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const findedUser = await User.findOne({ _id: userId });
    if (!findedUser) {
      const error = new Error("no user found");
      error.statusCode = 400;
      throw error;
    }

    const findedProduct = await Product.findById(productId);
    const findedCart = await Cart.findOne({ user: userId, product: productId });
    const { isOfferValid, discountAmount, offerEndDate, offerPrice } =
      checkOfferValidity(findedProduct?.data);

    if (findedCart) {
      findedCart.quantity += 1;
      findedCart.total_amount += isOfferValid
        ? parseFloat(offerPrice)
        : parseFloat(findedProduct?.data?.sale_price);
      await findedCart.save();
    } else {
      const newCart = new Cart({
        product: productId,
        quantity: 1,
        total_amount: isOfferValid
          ? offerPrice
          : findedProduct?.data?.sale_price,
        user: findedUser._id,
      });
      await newCart.save();
    }

    res.status(200).json({ message: "item added successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = addToCart;
