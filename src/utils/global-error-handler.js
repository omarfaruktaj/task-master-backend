const handleDevelopmentError = (err, _req, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const handleProductionError = (err, _req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (error, req, res, next) => {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "development") {
    handleDevelopmentError(error, req, res);
  } else if (nodeEnv === "production") {
    let err = { ...error };
    err.message = error.message;
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    handleProductionError(err, req, res);
  }
};
