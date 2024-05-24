const order = require("../../../models/Order");
const cancelOrder = async (req, res, next) => {
  const { userId, orderId, status,reason } = req.body;

  try {
    const findedOrder = await order.findOne({ user: userId, _id: orderId });
    findedOrder.status = status;
    findedOrder.cancel_reason = reason;
    await findedOrder.save();
    res
      .status(200)
      .json({ message: "order cancel successfully ", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = cancelOrder;
