import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import zodErrorHandler from "../error/zodErrorHandler";
import duplicateErrorHandler from "../error/duplicateErrorHandler";
import AppError from "../error/AppError";
import castErrorHandler from "../error/castErrorHandler";
import { JsonWebTokenError } from "jsonwebtoken";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = err.message || "Something went wrong!";
  let statusCode = err.statusCode || 500;
  let error = err || null;
  let stack = err.stack || "";

  if (err instanceof ZodError) {
    const result = zodErrorHandler(err);
    statusCode = result.statusCode;
    message = result.message;
    error = result.error;
  } else if (err?.name === "CastError") {
    const result = castErrorHandler(err);
    statusCode = result.statusCode;
    message = result.message;
    error = result.error;
  } else if (err.code === 11000) {
    const result = duplicateErrorHandler(err);
    statusCode = result.statusCode;
    message = result.message;
    error = result.error;
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Unauthorized Access, please login";
    error = null;
    stack = null;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = null;
  } else if (err instanceof Error) {
    statusCode = 500;
    if (err.message) {
      message = err.message;
    } else {
      message =
        statusCode === 400
          ? "Bad Request"
          : statusCode === 404
            ? "Not Found"
            : statusCode === 401
              ? "Unauthorized Access"
              : statusCode === 403
                ? "Forbidden Access"
                : statusCode === 500
                  ? "Server Error"
                  : "Something went wrong";
    }
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: error,
    stack: config.node_env === "development" ? stack : null,
  });
};

export default globalErrorhandler;
