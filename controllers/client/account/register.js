const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const registerUser = async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  try {
    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
      const error = new Error("this email is already taken");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      active: 'block',
      role: "vendor",
    });

    const savedUser = await newUser.save();

    res.status(200).json({
      message: "account created successfully",
      userId: savedUser._id,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
