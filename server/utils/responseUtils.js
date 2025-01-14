const multer = require("multer");

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
class SuccessResponse {
  constructor(message, data, statusCode = 200) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
const sendSuccessResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json(new SuccessResponse(message, data, statusCode));
};

const handleError = (next, message, statusCode , logMessage = null) => {
  if (logMessage) console.log(logMessage);
  console.log("Error Message :",message);
  console.log(logMessage);
  next(new ErrorResponse(message, statusCode));
};

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return handleError(next, "File size exceeds the limit.", 400);
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return handleError(next, "File count exceeds the limit.", 400);
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return handleError(next, "Unexpected file.", 400);
    }
    if (err.code === "LIMIT_PART_COUNT") {
      return handleError(next, "Part count exceeds the limit.", 400);
    }
    return handleError(next, "Multer error occurred.", 400);
  } else if (err) {
    return handleError(next, "An unknown error occurred.", 500);
  }
  next();
};
module.exports = {
  sendSuccessResponse,
  handleError,
  multerErrorHandler,
};
