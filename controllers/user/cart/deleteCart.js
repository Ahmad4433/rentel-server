const Cart = require("../../../models/Cart");
const User = require("../../../models/User");
const deleteCart = async (req, res, next) => {
  const { productId, userId } = req.body;

  try {
    await Cart.findOneAndDelete({ user: userId, product: productId });
    res.status(200).json({ message: "success", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCart;
