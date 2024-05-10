const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    data: { type: Object },
    image: [{ type: mongoose.Types.ObjectId, ref: "Galary" }],
    // image: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
