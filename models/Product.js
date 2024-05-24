const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    data: { type: Object },
    image: [{ type: mongoose.Types.ObjectId, ref: "Galary" }],
    vendor: { type: mongoose.Types.ObjectId, ref: "User" },
    review: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    // image: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
