const express = require("express");
const isAuth = require("../../middlewares/isAuth");
const isAdmin = require("../../middlewares/isAdmin");
const updateOrderStatus = require("../../controllers/admin/updateOrderstatus");
const router = express.Router();
router.post("/update", isAuth, isAdmin, updateOrderStatus);

module.exports = router;
