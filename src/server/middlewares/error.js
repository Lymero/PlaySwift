const httpStatus = require("http-status");
const createError = require("http-errors");
const logger = require("../modules/logger").logger;

const handler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  logger.error(err);
  res.statusMessage = err.message;

  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send();
};

const notFound = (req, res, next) => {
  next(createError(httpStatus.NOT_FOUND));
};

exports.handler = handler;
exports.notFound = notFound;
