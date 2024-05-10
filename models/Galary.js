const mongoose = require("mongoose");

const galarySchema = new mongoose.Schema(
  {
    image: { type: Array },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Galary", galarySchema);
