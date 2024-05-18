const isAuth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const headers = req.get("Authorization") || req.get("authorization");

  try {
    if (!headers) {
      const error = new Error("unauthorized");
      error.statusCode = 400;
      throw error;
    }

    const token = headers.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!decoded) {
      const error = new Error("invalid token");
      error.statusCode = 400;
      throw error;
    }

    req.userRole = decoded.userRole;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
