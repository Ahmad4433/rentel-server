const addToCart = require("../../controllers/user/cart/addToCart");
const getCart = require("../../controllers/user/cart/getCart");
const removeFromCart = require("../../controllers/user/cart/removeFromCart");
const deleteCart = require('../../controllers/user/cart/deleteCart')
const express = require("express");

const router = express.Router();

router.post("/add/cart", addToCart);
router.get("/get/cart", getCart);
router.put("/remove/cart", removeFromCart);
router.delete('/delete/cart',deleteCart)
module.exports = router;
