const express = require("express");
const uploadFile = require("../../middlewares/multer");
const validateProductEntry = require("../../middlewares/validateProductEntry");
const addNewProduct = require("../../controllers/vendor/products/addNewProduct");
const checkImagePresent = require('../../utils/checkImagePresent')
const getProductList = require('../../controllers/vendor/products/getProductList')
const router = express.Router();


router.post("/add", uploadFile(),checkImagePresent, validateProductEntry,addNewProduct);
router.get('/get/list',getProductList)
module.exports = router;
