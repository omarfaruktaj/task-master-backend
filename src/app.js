const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./utils/global-error-handler");
const AppError = require("./utils/app-error");

const app = express();

app.use(cors());

app.get("/health", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Server is running smoothly!",
  });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to our Task Master backend.",
  });
});

app.all("*", (req, _res, next) => {
  next(new AppError(`Route not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
