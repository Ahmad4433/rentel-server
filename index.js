const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/admin/products");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const getConnection = require("./utils/getConnection");
const productCategoryRoutes = require("./routes/admin/productCategory");
const productBrandRoutes = require("./routes/admin/productBrand");
const uploadProductImageRoutes = require("./routes/admin/uploadImage");
const userAccountRoutes = require("./routes/client/account");
const cartRouter = require('./routes/user/cart')
// client side routes
const getClientFilteredProductList = require("./routes/client/products");
const app = express();
getConnection();
app.use(cors());
app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({ extended: true,limit:'20mb' }));
app.get("/", (req, res, next) => {
  res.send("server is running");
});
app.use("/admin/product", productRoutes);
app.use("/admin/product/image", uploadProductImageRoutes);
app.use("/admin/product/category", productCategoryRoutes);
app.use("/admin/product/brand", productBrandRoutes);
app.use('/item',cartRouter)
// client side apis
app.use("/client/product", getClientFilteredProductList);
app.use("/user", userAccountRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);
