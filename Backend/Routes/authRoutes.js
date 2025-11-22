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
} from "../Controller/authController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.get("/check-user", checkUserExist);
router.post("/register-user", registerUser);
router.post("/send-email-otp", sendVerifyEmailOtp);
router.post("/verify-email-otp", checkVerifyEmailOtp);
router.put("/set-password", setUserPassword);

// LOGIN
router.post("/login", loginUser);

// RESET
router.post("/reset-password-link", resetPasswordLink);
router.get("/verify-reset-token", verifyResetToken);
router.put("/reset-password", resetPassword);


router.get("/getUser", protect, getUserInfo);



export default router;
