const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  const isJSONError =
    err instanceof SyntaxError && err.status === 400 && "body" in err;

  if (process.env.NODE_ENV === "production") {
    return res.status(statusCode).json({
      success: false,
      message: isJSONError
        ? "Invalid JSON format in request body"
        : statusCode === 500
          ? "Internal server error"
          : err.message,
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
