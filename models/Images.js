const mongoose = require("mongoose");
const imagesSchema = new mongoose.Schema(
  {
    image: [{ type: String }],
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Image", imagesSchema);
