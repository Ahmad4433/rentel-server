const Order = require("../../../models/Order");
const Review = require("../../../models/Review");
const Product = require("../../../models/Product");
const addOrderFeedback = async (req, res, next) => {
  const { review, rating, orderId } = req.body;

  try {
    const findedOrder = await Order.findById(orderId).select(
      "order_detail user"
    );
    const newReview = new Review({
      user: findedOrder.user,
      review: review,
      rating: rating,
      product: findedOrder.order_detail.map((item) => item.id),
    });
    const savedReview = await newReview.save();
    // Update each product with the review ID
    for (const item of findedOrder.order_detail) {
      await Product.findByIdAndUpdate(item.id, {
        $set: { review: savedReview._id },
      });
    }
    res.status(200).json({ message: "thanks for your feedback", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = addOrderFeedback;
