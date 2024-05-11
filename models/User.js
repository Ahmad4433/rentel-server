const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    mobile: { type: String },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      default: "customer",
    },
    address: { type: Object },
    active: { type: Boolean, default: true },
    order: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  },
  { timeseries: true }
);

module.exports = mongoose.model("User", registerSchema);
