const Cart = require("../../../models/Cart");
const removeFromCart = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const findedCart = await Cart.findOne({ product: productId, user: userId });
    if (findedCart.quantity > 1) {
      findedCart.quantity -= 1;
      await findedCart.save();
    } else {
      await Cart.findOneAndDelete({ user: userId, product: productId });
    }

    res.status(200).json({ message: "success", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = removeFromCart;
