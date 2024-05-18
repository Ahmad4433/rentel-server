const express = require("express");
const getVendorList = require("../../controllers/admin/getCendorList");
const isAuth = require("../../middlewares/isAuth");
const isAdmin = require("../../middlewares/isAdmin");
const getSingleVendor = require("../../controllers/admin/getSingleVendor");
const toggleVendorStatus = require("../../controllers/admin/toggleVendorStatus");
const router = express.Router();

router.get("/list", isAuth, isAdmin, getVendorList);
router.get("/single", isAuth, isAdmin, getSingleVendor);
router.post("/update/status", isAuth, isAdmin, toggleVendorStatus);
module.exports = router;
