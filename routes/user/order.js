const express = require("express");
const placeOrder = require("../../controllers/user/orders/placeOrder");
const cancelOrder = require('../../controllers/user/orders/cancelOrder')
const router = express.Router();

router.post("/place", placeOrder);
router.post('/cancel',cancelOrder)
module.exports = router;
