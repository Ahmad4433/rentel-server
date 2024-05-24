const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    product: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    review: { type: String },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
