import express from "express";
import {
  getUserInfo,
  setUserPassword,
  loginUser,
  checkUserExist,
  sendVerifyEmailOtp,
  checkVerifyEmailOtp,
  resetPasswordLink,
  verifyResetToken,
  resetPassword,
  registerUser,
  logoutUser,
} from "../Controller/authController.js";
import { validate } from "../Middleware/validate.js";
import { protect } from "../Middleware/authMiddleware.js";
import {
  checkVerifyEmailOtpSchema,
  registerUserSchema,
  sendVerifyEmailOtpSchema,
  setUserPasswordSchema,
  tokenSchema,
  loginUserSchema,
  tokenPasswordSchema,
  checkUserExistSchema,
} from "../zodSchema/authSchema.js";
import otpLimiter from "../Middleware/rateLimiters/otpLimiter.js";
import loginLimiter from "../Middleware/rateLimiters/loginLimiter.js";
import resetPasswordLimiter from "../Middleware/rateLimiters/resetPasswordLimiter.js";
const router = express.Router();

// REGISTER
router.get("/check-user", validate(checkUserExistSchema), checkUserExist);

router.post("/register-user", validate(registerUserSchema), registerUser);

router.post(
  "/send-email-otp",
  otpLimiter,
  validate(sendVerifyEmailOtpSchema),
  sendVerifyEmailOtp
);

router.post(
  "/verify-email-otp",
  otpLimiter,
  validate(checkVerifyEmailOtpSchema),
  checkVerifyEmailOtp
);

router.put("/set-password", validate(setUserPasswordSchema), setUserPassword);

router.post("/logout", logoutUser);
// LOGIN
router.post("/login", loginLimiter, validate(loginUserSchema), loginUser);

router.post(
  "/reset-password-link",
  resetPasswordLimiter,
  validate(sendVerifyEmailOtpSchema),
  resetPasswordLink
);

router.post("/verify-reset-token", validate(tokenSchema), verifyResetToken);

router.put(
  "/reset-password",
  resetPasswordLimiter,
  validate(tokenPasswordSchema),
  resetPassword
);

router.get("/getUser", protect, getUserInfo);

export default router;
