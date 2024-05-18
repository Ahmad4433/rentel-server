const Order = require("../../../models/Order");
const orderList = async (req, res, next) => {
  const userId = req.userId;
  const role = req.userRole;
  try {
    let adminOrderList;
    if (role === "admin") {
      adminOrderList = await Order.find();
    }
    const findedList = await Order.find({
      "order_detail.vendorId": userId,
    });

    const newObje = findedList.map((item) => {
      return {
        ...item._doc,

        order_detail: item.order_detail.filter((item) => {
          return item.vendorId === userId;
        }),
      };
    });

    const filteredList = newObje.map((item) => {
      return {
        ...item,
        grandTotal: item.order_detail.reduce((acc, cur) => {
          return (acc += cur.total);
        }, 0),
      };
    });

    res.status(200).json({
      message: "success",
      status: true,
      filteredList: role === "admin" ? adminOrderList : filteredList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = orderList;
