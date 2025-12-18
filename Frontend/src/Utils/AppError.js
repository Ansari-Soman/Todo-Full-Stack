export const AppError = class AppError extends Error {
  constructor(message, { userMessage = null, status = null }) {
    super(message);
    this.userMessage = userMessage;
    this.name = "AppError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
};
