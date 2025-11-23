import bcrypt from "bcryptjs";
import {
  sendEmailOtp,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendWelcomeEmail,
} from "../helper/email.js";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../Utils/asyncHandler.js"; 
import crypto from "crypto";
const generateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const generateOTP = () => String(crypto.randomInt(100000, 1000000));
const generateResetPasswordOtp = (id) =>
  jwt.sign({ id }, process.env.RESET_SECRET, { expiresIn: "15m" });

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
    res.status(400);
    throw new Error("A verified account already exists with this email.");
  }

  if (user && !user.isAccountVerified) {
    user.fullName = fullName;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Unverified user found. Proceed to OTP verification.",
    });
  }

  user = new User({ fullName, email });
  await user.save();

  return res.status(201).json({
    success: true,
    message: "User created. Please proceed to OTP verification.",
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
    res.status(400);
    throw new Error("Account is already verified");
  }

  if (user.otpLockUntil && user.otpLockUntil > new Date()) {
    res.status(429);
    throw new Error("Too many attempts. Try again later");
  }

  if (user.resendOtpCooldown && user.resendOtpCooldown > new Date()) {
    const waitTime = Math.ceil((user.resendOtpCooldown - Date.now()) / 1000);
    res.status(429);
    throw new Error(
      `Please wait ${waitTime} seconds before requesting another OTP`
    );
  }
  const otp = generateOTP();
  user.verifyOtp = otp;
  user.verifyOtpExpiredAt = new Date(Date.now() + 15 * 60 * 1000);
  user.resendOtpCooldown = new Date(Date.now() + 60 * 1000);
  await user.save();
  await sendEmailOtp({
    name: user.fullName,
    to: user.email,
    otp: otp,
  });
  return res
    .status(200)
    .json({ success: true, message: "OTP sent to your email" });
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
    res.status(400);
    throw new Error("Account is already verified");
  }
  if (user.otpLockUntil && user.otpLockUntil > new Date()) {
    res.status(429);
    throw new Error("Account temporarily locked. Try again later");
  }
  if (user.otpAttemptCount >= 5) {
    user.otpLockUntil = new Date(Date.now() + 5 * 60 * 1000);
    user.otpAttemptCount = 0;
    await user.save();
    res.status(429);
    throw new Error("Too many attempts. Try again later");
  }

  // Checking expiration time
  if (user.verifyOtpExpiredAt && user.verifyOtpExpiredAt < new Date()) {
    res.status(400);
    throw new Error("OTP expired");
  }

  // Assuming user.verifyOtp is hashed (as per your schema pre-save hook)
  if (!(await bcrypt.compare(otp, user.verifyOtp))) {
    user.otpAttemptCount += 1;
    await user.save();
    res.status(400);
    throw new Error("Invalid OTP");
  }

  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpiredAt = null;
  user.resendOtpCooldown = null;
  user.otpAttemptCount = 0;
  user.otpLockUntil = null;
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Verification successfull" });
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
    res.status(400);
    throw new Error("Account is not verified");
  }

  if (user.password !== "") {
    res.status(400);
    throw new Error("Cannot set password. A password already exists.");
  }

  user.password = password;
  await user.save();
  await sendWelcomeEmail({
    to: user.email,
    name: user.fullName,
  });

  const token = generateLoginToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const userData = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    isAccountVerified: user.isAccountVerified,
  };
  return res.status(201).json({
    success: true,
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

  const userData = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    isAccountVerified: user.isAccountVerified,
  };

  // Setting cookie
  const token = generateLoginToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

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
export const verifyResetToken = asyncHandler((req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.RESET_SECRET);
  return res.status(200).json({ success: true, message: "Valid token" });
});

export const resetPasswordLink = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isAccountVerified) {
    res.status(400);
    throw new Error("Account is not verified");
  }

  if (user.resendOtpCooldown && user.resendOtpCooldown > new Date()) {
    const waitTime = Math.ceil((user.resendOtpCooldown - Date.now()) / 1000);
    res.status(429);
    throw new Error(`Please wait ${waitTime} seconds before requesting again`);
  }

  const resetToken = generateResetPasswordOtp(user._id);
  const resetLink = `${process.env.CLIENT_URL}/reset-password-link?token=${resetToken}`;

  await sendResetPasswordEmail({
    to: user.email,
    name: user.fullName,
    resetLink,
  });

  user.resendOtpCooldown = new Date(Date.now() + 60 * 1000);
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Password reset link sent to your email",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const decode = jwt.verify(token, process.env.RESET_SECRET);
  const userId = decode.id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isAccountVerified) {
    res.status(400);
    throw new Error("Account is not verified");
  }

  user.password = newPassword;
  await user.save();
  await sendResetSuccessEmail({
    to: user.email,
    loginUrl: `${process.env.CLIENT_URL}/api/auth/login`,
    name: user.fullName,
  });
  return res
    .status(200)
    .json({ success: true, message: "Password reset successful" });
});
