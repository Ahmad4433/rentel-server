const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    order_detail: [],
    address: { type: Object },
    grandTotal: { type: Number },
    status: { type: String, default: "pending" },
    cancel_reason:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
