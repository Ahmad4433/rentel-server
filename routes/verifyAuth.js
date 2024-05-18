const express = require("express");
const verifyIsVendor = require("../controllers/vendor/verifyIsVendor");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.get("/verify", isAuth, verifyIsVendor);

module.exports = router;
