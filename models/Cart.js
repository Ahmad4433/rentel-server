const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    total_amount: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
