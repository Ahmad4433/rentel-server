const express = require("express");
const loginVendor = require("../../controllers/vendor/loginVendor");
const router = express.Router();

router.post("/login", loginVendor);

module.exports = router;
