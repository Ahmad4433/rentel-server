const User = require("../../../models/User");
const loginUser = async (req, res, next) => {
  const { mobile } = req.body;

  try {
    // const isUserExist = await User.findOne({ mobile: mobile });

    const newUser = new User({
          mobile: mobile,
        });
        await newUser.save();
        res.status(200).json({ message: "success", status: true });

    // if (!isUserExist) {
    //  
    //   return
    // } else {
    //   res.status(200).json({ message: "success", status: true });
    // }
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
