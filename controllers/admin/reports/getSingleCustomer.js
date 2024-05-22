const User = require("../../../models/User");
const getSingleCustomer = async (req, res, next) => {
  const userId = req.query.id;
  console.log(userId)
  try {
    const findedUser = await User.findById(userId)
      .select("-product")
      .populate({
        path: "order",
        options: { sort: { _id: -1 } },
      });

    res.status(200).json({ message: "success", status: true, findedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleCustomer;
