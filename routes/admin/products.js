const express = require("express");
const uploadFile = require("../../middlewares/multer");
const validateProductEntry = require("../../middlewares/validateProductEntry");
const addNewProduct = require("../../controllers/vendor/products/addNewProduct");
const checkImagePresent = require("../../utils/checkImagePresent");
const getProductList = require("../../controllers/vendor/products/getProductList");
const updateProduct = require("../../controllers/vendor/products/updateProduct");
const deleteProduct = require("../../controllers/vendor/products/deleteProduct");
const isAuth = require("../../middlewares/isAuth");
const router = express.Router();

router.post("/add", isAuth, validateProductEntry, addNewProduct);
router.get("/get/list", isAuth, getProductList);
router.put("/update", validateProductEntry, updateProduct);
router.delete("/delete", deleteProduct);
module.exports = router;
