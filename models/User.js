const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    user: { type: Object },
    email: { type: String },
    name: { type: String },
    password: { type: String },
    mobile: { type: String },
    role: {
      type: String,
      default: "customer",
    },
    profile: { type: String },
    address: { type: Object },
    active: { type: String, default: "active" },
    order: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", registerSchema);
