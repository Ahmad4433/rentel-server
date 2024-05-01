const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/admin/products");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const getConnection = require("./utils/getConnection");
const productCategoryRoutes = require('./routes/admin/productCategory')
const productBrandRoutes = require('./routes/admin/productBrand')
const app = express();
getConnection()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/admin/product", productRoutes);

app.use('/admin/product/category',productCategoryRoutes)
app.use('/admin/product/brand',productBrandRoutes)

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);
