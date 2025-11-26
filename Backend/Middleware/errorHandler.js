const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  const isJSONError =
    err instanceof SyntaxError && err.status === 400 && "body" in err;

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(400).json({
      success: false,
      resetTokenStatus: "invalid",
      message: "Invalid or expired reset token",
    });
  }

  if (process.env.NODE_ENV === "production") {
    return res.status(statusCode).json({
      success: false,
      message: isJSONError
        ? "Invalid JSON format in request body"
        : err.clientMessage || "An error occurred processing your request",
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
    ...(isJSONError && {
      hint: "Check your JSON syntax - missing quotes, commas, or brackets?",
    }),
  });
};

export default errorHandler;
