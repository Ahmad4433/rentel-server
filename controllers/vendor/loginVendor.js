const User = require("../../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../../services/generateToken");
const loginVendor = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findedVendor = await User.findOne({ email: email });

    if (!findedVendor) {
      const error = new Error("no email found");
      error.statusCode = 400;
      throw error;
    }

    const isActive = findedVendor.active === "active";

    if (!isActive) {
      const error = new Error("your account is under review");
      error.statusCode = 400;
      throw error;
    }
    const isMAtchPass = await bcrypt.compare(password, findedVendor.password);
    if (!isMAtchPass) {
      const error = new Error("incorrect password");
      error.statusCode = 400;
      throw error;
    }

    const payload = {
      userId: findedVendor._id,
      userRole: findedVendor.role,
    };
    const { accessToken, reFreshToken } = generateToken(payload);

    res.status(200).json({
      message: "logged in successfully",
      status: true,
      tokens: { accessToken, reFreshToken },
      role: findedVendor.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginVendor;
