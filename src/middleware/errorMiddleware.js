const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.errors) {
    return res.status(statusCode).json({
      success: false,
      errors: err.errors,
    });
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = `${Object.keys(err.keyValue)[0]} already exists`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;