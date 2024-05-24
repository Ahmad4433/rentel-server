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
const cartRouter = require("./routes/user/cart");
const orderRoutes = require("./routes/user/order");
const productReviewRoutes = require("./routes/user/addProductReview");
// super admin
const venderListRoute = require("./routes/admin/vendorList");
const vendorAccountRoutes = require("./routes/admin/login");
const orderSatstusRoutes = require("./routes/admin/updateOrderStatus");
const salesRepoteRoutes = require("./routes/admin/reports/salesReport");

// client side routes
const getClientFilteredProductList = require("./routes/client/products");
const app = express();
getConnection();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.get("/", (req, res, next) => {
  res.send("server is running");
});
app.use("/admin/product", productRoutes);
app.use("/admin/product/image", uploadProductImageRoutes);
app.use("/admin/product/category", productCategoryRoutes);
app.use("/admin/product/brand", productBrandRoutes);
const vendorReportsRoutes = require("./routes/admin/reports/vendorReports");
const verificationRoutes = require("./routes/verifyAuth");
app.use("/item", cartRouter);
// client side apis
app.use("/client/product", getClientFilteredProductList);
app.use("/user", userAccountRoutes);
app.use("/user/order", orderRoutes);
app.use("/product/review", productReviewRoutes);
// super admin
app.use("/admin/vendor", venderListRoute);
app.use("/vendor", vendorAccountRoutes);
app.use("/vendor/report", vendorReportsRoutes);
app.use("/admin/order/status", orderSatstusRoutes);
app.use("/admin/report", salesRepoteRoutes);

// verification
app.use("/auth", verificationRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);
