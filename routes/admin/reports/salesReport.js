const express = require("express");
const isAuth = require("../../../middlewares/isAuth");
const isAdmin = require("../../../middlewares/isAdmin");
const salesReport = require("../../../controllers/admin/reports/salesReport");
const router = express.Router();
router.get("/sale", isAuth, isAdmin, salesReport);
module.exports = router;
