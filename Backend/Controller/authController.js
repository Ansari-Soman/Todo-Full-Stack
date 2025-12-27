import bcrypt from "bcryptjs";
import {
  sendEmailOtp,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendWelcomeEmail,
} from "../helper/email.js";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";
import {
  generateLoginToken,
  generateOpaqueToken,
  generateOTP,
  generateResetPasswordOtp,
  hashOpaqueToken,
  setCookie,
  setUserData,
} from "../helper/helper.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { verifyResetTokenHelper } from "../helper/verifyResetToken.js";

// When typing email for registration
export const checkUserExist = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  return res.status(200).json({ success: true, exists: !!user });
});

// REGISTERING EMAIL AND NAME
export const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName } = req.body;
  let user = await User.findOne({ email });

  if (user && user.isAccountVerified) {
    res.status(409);
    throw new Error("A verified account already exists with this email.");
  }

  if (user && !user.isAccountVerified) {
    user.fullName = fullName;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Unverified account found. Proceed to OTP verification.",
    });
  }

  user = new User({ fullName, email });
  await user.save();

  return res.status(201).json({
    success: true,
    message: "Account created. Please proceed to OTP verification.",
  });
});

// VALIDATING EMAIL
export const sendVerifyEmailOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isAccountVerified) {
    res.status(409);
    throw new Error("Account is already verified");
  }

  const otp = generateOTP();
  user.verifyOtp = otp;
  user.verifyOtpExpiredAt = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  await sendEmailOtp({
    name: user.fullName,
    to: user.email,
    otp: otp,
  });

  return res.status(200).json({
    success: true,
    otpStatus: "sent",
    message: "OTP sent to your email",
  });
});

// VERIFY ACCOUNT
export const checkVerifyEmailOtp = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isAccountVerified) {
    res.status(409);
    throw new Error("Account is already verified");
  }

  // Checking expiration time
  if (user.verifyOtpExpiredAt && user.verifyOtpExpiredAt < new Date()) {
    res.status(403);
    throw new Error("OTP expired");
  }

  // Assuming user.verifyOtp is hashed (as per your schema pre-save hook)
  if (!(await bcrypt.compare(otp, user.verifyOtp))) {
    user.otpAttemptCount += 1;
    await user.save();
    res.status(401);
    throw new Error("Invalid OTP");
  }

  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpiredAt = null;
  await user.save();
  return res.status(200).json({
    success: true,
    otpStatus: "verified",
    message: "Verification successfull",
  });
});

// SETTING USER PASSWORD
export const setUserPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isAccountVerified) {
    res.status(401);
    throw new Error("Account is not verified");
  }

  if (user.password !== "") {
    res.status(409);
    throw new Error("Cannot set password. A password already exists.");
  }

  user.password = password;
  await user.save();
  await sendWelcomeEmail({
    to: user.email,
    name: user.fullName,
  });

  // Setting up cookie with token
  const token = generateLoginToken(user._id);
  setCookie(res, token);

  const userData = setUserData(user);
  return res.status(201).json({
    success: true,
    accountStatus: "activated",
    message: "Account created successfully",
    userId: userData._id,
    userData,
  });
});

// LOGIN AND USER INFO
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Cheking user and password
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Checking account verification
  if (!user.isAccountVerified) {
    res.status(401);
    throw new Error("Account is not verified");
  }

  const userData = setUserData(user);

  // Setting cookie
  const token = generateLoginToken(user._id);
  setCookie(res, token);
  // Successfull response
  return res.status(200).json({
    success: true,
    message: "Login successful",
    userId: user._id,
    userData,
  });
});

export const getUserInfo = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).select(
    "fullName email isAccountVerified _id"
  );
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json({
    success: true,
    message: "Successful",
    userId: user._id,
    userData: user,
  });
});

// RESET PASSWORD
export const verifyResetToken = asyncHandler(async (req, res) => {
  const { token } = req.body;
  await verifyResetTokenHelper(token);

  return res.status(200).json({
    success: true,
    resetTokenStatus: "valid",
    message: "Valid token",
  });
});

export const resetPasswordLink = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isAccountVerified) {
    res.status(401);
    throw new Error("Account is not verified");
  }

  const resetToken = generateOpaqueToken();
  user.resetPasswordTokenHash = hashOpaqueToken(resetToken);
  user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  await sendResetPasswordEmail({
    to: user.email,
    name: user.fullName,
    resetLink,
  });

  return res.status(200).json({
    success: true,
    resetEmailStatus: "sent",
    message: "Password reset link sent to your email",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await verifyResetTokenHelper(token);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isAccountVerified) {
    res.status(401);
    throw new Error("Account is not verified");
  }

  user.password = newPassword;
  user.resetPasswordTokenHash = null;
  user.resetPasswordExpiresAt = null;
  await user.save();
  await sendResetSuccessEmail({
    to: user.email,
    loginUrl: `${process.env.CLIENT_URL}/login`,
    name: user.fullName,
  });
  return res
    .status(200)
    .json({ success: true, message: "Password reset successful" });
});

export const logoutUser = asyncHandler(async (req, res) => {
  // Clear the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
