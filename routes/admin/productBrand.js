const express = require("express");
const checkImagePresent = require("../../utils/checkImagePresent");
const fileUpload = require("../../middlewares/multer");
const addNewBrand = require('../../controllers/vendor/product-brands/addNewBrand')
const getBrandList = require('../../controllers/vendor/product-brands/getBrandList');

const router = express.Router();

router.post(
  "/add",
  fileUpload(),
  checkImagePresent,
  addNewBrand
);
router.get('/get/list',getBrandList)



module.exports = router