const registerUser = require("../../controllers/client/account/register");
const loginUser = require("../../controllers/client/account/loginUser");
const updateUserProfile = require("../../controllers/user/updateProfile");
const fileUpload = require("../../middlewares/multer");
const getUser = require("../../controllers/user/singleUser");
const express = require("express");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile/update", fileUpload(), updateUserProfile);
router.get("/single", getUser);

module.exports = router;
