const jwt = require("jsonwebtoken");
const generateToken = (data) => {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1d",
  });
  const reFreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "1y",
  });

  return { accessToken, reFreshToken };
};

module.exports = generateToken;
