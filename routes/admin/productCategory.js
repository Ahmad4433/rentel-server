const express = require("express");
const checkImagePresent = require("../../utils/checkImagePresent");
const fileUpload = require("../../middlewares/multer");
const addNewCategory = require("../../controllers/vendor/product-categories/addNewCategory");
const getCategoryList = require("../../controllers/vendor/product-categories/getCategoryList");
const router = express.Router();

router.post(
  "/add",
  fileUpload(),
  checkImagePresent,
  addNewCategory
);
router.get('/get/list',getCategoryList)



module.exports = router