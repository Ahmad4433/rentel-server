const User = require("../../models/User");
const toggleVendorStatus = async (req, res, next) => {
  const vendorId = req.query.id;
  const { status } = req.body;

  try {
    const findedVendor = await User.findById(vendorId);
    findedVendor.active = status;
    await findedVendor.save();

    res.status(200).json({ message: "success", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = toggleVendorStatus;
