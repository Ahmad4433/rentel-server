const express = require("express");
const uploadFile = require("../../middlewares/multer");
const validateProductEntry = require("../../middlewares/validateProductEntry");
const addNewProduct = require("../../controllers/vendor/products/addNewProduct");
const checkImagePresent = require("../../utils/checkImagePresent");
const getProductList = require("../../controllers/vendor/products/getProductList");
const updateProduct = require("../../controllers/vendor/products/updateProduct");
const router = express.Router();

router.post("/add", validateProductEntry, addNewProduct);
router.get("/get/list", getProductList);
router.put("/update", uploadFile(), validateProductEntry, updateProduct);
module.exports = router;
