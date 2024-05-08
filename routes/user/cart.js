const addToCart = require("../../controllers/user/cart/addToCart");
const express = require("express");





const router = express.Router();

router.post("/cart", addToCart);


module.exports = router;
