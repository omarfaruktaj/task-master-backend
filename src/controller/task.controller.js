const AppError = require("../utils/app-error");
const User = require("../models/user.model");
const Task = require("../models/task.model");

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const email = req.email;

    if (!title || !description)
      return next(new AppError("title and description are require. "));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("No user found", 404));

    const newTask = await Task.create({
      title,
      description,
      status,
      user: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully.",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
};
