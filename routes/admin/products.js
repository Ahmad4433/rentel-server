const express = require("express");
const uploadFile = require("../../middlewares/multer");
const validateProductEntry = require("../../middlewares/validateProductEntry");
const addNewProduct = require("../../controllers/vendor/products/addNewProduct");
const checkImagePresent = require("../../utils/checkImagePresent");
const getProductList = require("../../controllers/vendor/products/getProductList");
const updateProduct = require("../../controllers/vendor/products/updateProduct");
const deleteProduct = require("../../controllers/vendor/products/deleteProduct");
const router = express.Router();

router.post("/add", validateProductEntry, addNewProduct);
router.get("/get/list", getProductList);
router.put("/update",  validateProductEntry, updateProduct);
router.delete("/delete", deleteProduct);
module.exports = router;
