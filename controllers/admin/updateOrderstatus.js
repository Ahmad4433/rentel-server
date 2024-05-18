const Order = require("../../models/Order");
const updateOrderStatus = async (req, res, next) => {
  const orderId = req.query.orderId;
  const { status } = req.body;

  try {
    const findedOrder = await Order.findById(orderId);
    if (!findedOrder) {
      const error = new Error("no order found");
      error.statusCode = 400;
      throw error;
    }
    if (findedOrder.status === "delivered") {
      const error = new Error("cannot change the status of delivered order");
      error.statusCode = 400;
      throw error;
    }
    findedOrder.status = status;
    await findedOrder.save();
    res
      .status(200)
      .json({
        message: "order status updated successfully",
        status: true,
        newStatus: status,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOrderStatus;
