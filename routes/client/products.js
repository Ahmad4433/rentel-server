const express = require("express");
const getProductByFilter = require("../../controllers/client/products/getProductsByFilter");
const getProductById = require("../../controllers/client/products/getProduductById");
const router = express.Router();

router.post("/list", getProductByFilter);
router.get("/detail", getProductById);
module.exports = router;
