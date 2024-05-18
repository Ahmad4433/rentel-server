const User = require("../../models/User");

const getVendorList = async (req, res, next) => {
  try {
    const userList = await User.find({ role: "vendor" }).select("-password");

    res.status(200).json({ message: "success", status: true, list: userList });
  } catch (error) {
    next(error);
  }
};

module.exports = getVendorList;
