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
    active: { type: Boolean, default: true },
  },
  { timeseries: true }
);

module.exports = mongoose.model("User", registerSchema);
