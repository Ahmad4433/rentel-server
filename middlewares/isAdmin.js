const isAdmin = (req, res, next) => {
  const role = req.userRole;
  if (role !== "admin") {
    const error = new Error("unauthorized");
    error.statusCode = 400;
    throw error;
  }

  next();
};

module.exports = isAdmin;
