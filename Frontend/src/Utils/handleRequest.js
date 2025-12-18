import { AppError } from "./AppError";
import { AppProperties } from "./AppProperties";

export const handleRequest = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (AppProperties.MODE === "development") {
        console.log("Error == ", error);
      }

      const isAppError = error instanceof AppError;
      const userMessage =
        (isAppError && error?.userMessage) ||
        error?.message ||
        "Something went wrong. Please try again";

      return { success: false, message: userMessage };
    }
  };
};
