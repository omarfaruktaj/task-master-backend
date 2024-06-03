const AppError = require("../utils/app-error");
const User = require("../models/user.model");
const Task = require("../models/task.model");
const ApiFeature = require("../utils/apiFeature");

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

const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const email = req.email;
    const id = req.params.id;

    if (!title || !description)
      return next(new AppError("title and description are require. "));

    const task = await Task.findById(id);
    if (!task) return next(new AppError("No task found", 404));

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { title, description, status },
      { runValidators: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: "Task added successfully.",
      data: {
        task: updatedTask,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const email = req.email;
    const id = req.params.id;

    const task = await Task.findById(id);
    if (!task) return next(new AppError("No task found", 404));

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { status },
      { runValidators: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: "Task added successfully.",
      data: {
        task: updatedTask,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });
    if (!user) return next(new AppError("No user found", 404));

    const features = new ApiFeature(Task.find({ user: user._id }), req.query)
      .search("title")
      .filter();

    const tasks = await features.query;

    res.status(201).json({
      success: true,
      message: "Task fetch successfully.",
      data: {
        tasks: tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);
    if (!task) return next(new AppError("No task found", 404));

    await Task.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      message: "Task successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
