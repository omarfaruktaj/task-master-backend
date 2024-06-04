const User = require("../models/user.model");
const AppError = require("../utils/app-error");
const signJWT = require("../utils/sign-jwt");

const getUser = async (req, res, next) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email });

    if (!user) return next(new AppError("No user found", 404));

    res.status(200).json({
      success: true,
      message: "User fetch successfully.",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, profile_image } = req.body;

    if (!name || !email)
      return next(new AppError("name and email are required.", 400));

    const existedUser = await User.findOne({ email });

    if (existedUser)
      return next(new AppError("User already exist with this email", 400));

    const user = await User.create({ name, email, profile_image });

    const token = signJWT(user);
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogin = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return next(new AppError("name and email are required.", 400));

    const existedUser = await User.findOne({ email });

    const token = signJWT(existedUser);
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        user: existedUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleSocial = async (req, res, next) => {
  try {
    const { name, email, profile_image } = req.body;

    if (!email || !name)
      return next(new AppError("name and email are required.", 400));
    let user;

    user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, profile_image });
    }

    const token = signJWT(user);
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const { name, profile_image } = req.body.user;
    if (!name || !email)
      return next(new AppError("name and email are required.", 400));

    const user = await User.findOne({ email });
    console.log(req.body.user);

    if (!user) return next(new AppError("No user found with this email", 400));

    user.name = name;
    user.profile_image = profile_image;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  handleLogin,
  handleSocial,
};
