const User = require("../models/user.model");
const AppError = require("../utils/app-error");
const signJWT = require("../utils/sign-jwt");

const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, profile_image } = req.body;

    console.log(name, email, profile_image);

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

const updateUser = async (req, res, next) => {
  try {
    const { name, profile_image } = req.body;

    const email = req.params.email;

    const user = await User.findOne({ email });

    if (!user) return next(new AppError("No user found with this email", 400));

    const updatedUser = await User.updateOne(
      { email },
      name,
      email,
      profile_image
    );

    res.status(201).json({
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
  createUser,
  updateUser,
};
