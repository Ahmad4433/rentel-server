const User = require("../../models/User");
const {
  checkImageMime,
  checkImageSize,
  cloudinaryConfig,
} = require("../../utils/index");
const updateUserProfile = async (req, res, next) => {
  const { email, firstName, lastName, mobile, userId } = req.body;

  try {
    let result;
    if (req.files && req.files.length > 0) {
      checkImageMime(req.files);
      checkImageSize(req.files);
      result = await cloudinaryConfig(req.files);
    }

    const findedUser = await User.findById(userId);
    findedUser.address = {
      ...findedUser.address,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: mobile,
    };
    findedUser.profile =
      req.files && req.files.length > 0
        ? result[0].secure_url
        : findedUser.profile;
    await findedUser.save();

    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserProfile;
