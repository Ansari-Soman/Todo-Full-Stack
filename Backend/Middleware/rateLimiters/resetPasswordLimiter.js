import rateLimit from "express-rate-limit";

const resetPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many reset password attempts.",
  },
});
export default resetPasswordLimiter;
