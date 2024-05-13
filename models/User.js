const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    user: { type: Object },
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
