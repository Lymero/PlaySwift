const { createLogger, format, transports } = require("winston");
const { combine, timestamp } = format;
const path = require("path");

const logPath = path.join(__dirname, "..\\logs");

const logger = createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.simple()
  ),
  transports: [
    new transports.File({
      filename: path.join(logPath, "errors.log"),
      level: "info"
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

exports.logger = logger;