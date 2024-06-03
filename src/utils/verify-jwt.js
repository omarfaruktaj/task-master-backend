const jwt = require("jsonwebtoken");
const AppError = require("./app-error");

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(new AppError("No token provided", 401));
  }
  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    req.email = decoded.email;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 403));
  }
};

module.exports = verifyJWT;
