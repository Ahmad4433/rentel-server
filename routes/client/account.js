const registerUser = require("../../controllers/client/account/register");
const loginUser = require("../../controllers/client/account/loginUser");
const express = require("express");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
