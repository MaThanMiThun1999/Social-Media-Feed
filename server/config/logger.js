const winston = require("winston");

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp to logs
  winston.format.errors({ stack: true }), // Include stack trace for errors
  winston.format.colorize(), // Add colors for console logs
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return stack ? `${timestamp} [${level}]: ${message} - ${stack}` : `${timestamp} [${level.bold}]: ${message}`;
  })
);

const consoleTransport = new winston.transports.Console({
  level: "debug", // Log everything (debug and above)
  format: winston.format.combine(
    winston.format.colorize(), // Colorize the logs in the console
    logFormat // Apply log format
  ),
});

// Winston logger instance
const logger = winston.createLogger({
  level: "info", // Default log level (logs everything 'info' and above)
  format: logFormat, // Use the custom format
  transports: [
    consoleTransport, // Output to the console
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// Log unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Log uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, error);
  process.exit(1); // Exit process if there's an uncaught exception
});

// Export the logger instance
module.exports = logger;
