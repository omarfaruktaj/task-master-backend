var jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const signJWT = (user) => {
  return jwt.sign({ email: user.email }, secret);
};

module.exports = signJWT;
