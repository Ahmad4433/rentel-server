const User = require("../../../models/User");
const loginUser = async (req, res, next) => {
  const { mobile } = req.body;

  try {
    const isUserExist = await User.findOne({ mobile: mobile });

    if (!isUserExist) {
      const newUser = new User({
        mobile: mobile,
      });
      const savedUser = await newUser.save();
      res
        .status(200)
        .json({ message: "success", status: true, userId: savedUser._id });

      return;
    } else {
      res
        .status(200)
        .json({ message: true, message: "success", userId: isUserExist._id });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
