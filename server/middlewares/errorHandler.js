const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message || "Server Error";
  error.statusCode = err.statusCode || 500;

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
