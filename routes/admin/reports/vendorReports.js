const express = require("express");
const orderList = require("../../../controllers/vendor/orders-reports/orderList");
const isAuth = require("../../../middlewares/isAuth");
const router = express.Router();

router.get("/order/list", isAuth, orderList);

module.exports = router;
