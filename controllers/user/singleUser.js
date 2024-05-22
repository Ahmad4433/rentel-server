const User = require("../../models/User");
const mongoose = require("mongoose");
const singleUser = async (req, res, next) => {
  const userId = req.query.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error = new Error("please login first");
      error.statusCode = 400;
      throw error;
    }

    const findedUser = await User.findById(userId).populate([
      {
        path: "order",
        options: { sort: { _id: -1 } },
      },
    ]);
    res.status(200).json({ message: "success", status: true, findedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = singleUser;
