const User = require("../../models/User");

const getSingleVendor = async (req, res, next) => {
  const vendorId = req.query.id;

  try {
    const findedVendor = await User.findById(vendorId).select("-password");

    res
      .status(200)
      .json({ messsage: "success", status: true, vendor: findedVendor });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleVendor;
