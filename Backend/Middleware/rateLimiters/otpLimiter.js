import rateLimit from "express-rate-limit";

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many requests. Try again after 5 minutes.",
  },
});
export default otpLimiter;
