const express = require("express");
const placeOrder = require("../../controllers/user/orders/placeOrder");
const router = express.Router();

router.post("/place", placeOrder);

module.exports = router;
