const express = require("express");
const checImagePresent = require("../../utils/checkImagePresent");
const uploadFile = require("../../middlewares/multer");
const uploadImage = require("../../controllers/vendor/images/uploadImage");
const router = express.Router();

router.post("/add", uploadFile(), checImagePresent, uploadImage);

module.exports = router;
