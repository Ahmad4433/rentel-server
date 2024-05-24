const express = require("express");
const addOrderFeedback = require("../../controllers/user/orders/addOrderFeedback");
const router = express.Router();
router.post("/add", addOrderFeedback);

module.exports = router;
