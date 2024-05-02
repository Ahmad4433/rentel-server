const express = require("express");
const getProductByFilter = require("../../controllers/client/products/getProductsByFilter");
const router = express.Router();

router.post("/list", getProductByFilter);

module.exports = router;
