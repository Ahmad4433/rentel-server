const verifyIsVendor = async (req, res, next) => {
  const role = req.userRole;

  try {
    if (!(role === "vendor" || role === "admin")) {
      const error = new Error("unauthorized");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ message: "success", status: true, role: role });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyIsVendor;
