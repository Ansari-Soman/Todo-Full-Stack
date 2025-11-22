import { isValidEmail, isValidPassword } from "../helper/validator.js";
import bcrypt from "bcryptjs";
import {
  sendEmailOtp,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendWelcomeEmail,
} from "../helper/email.js";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";
import { use } from "react";

const generateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};

const generateOTP = () => String(Math.floor(100000 + Math.random() * 900000));
const generateResetPasswordOtp = (id) =>
  jwt.sign({ id }, process.env.RESET_SECRET, { expiresIn: "15m" });

// When typing email for registration
export const checkUserExist = async (req, res) => {
  const { email } = req.query; // Removed extra .email from req.query.email
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  // Necessary or not? (Yes, input validation is always necessary)
  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Email format is not valid" });

  try {
    const user = await User.findOne({ email });
    return res.status(200).json({ success: true, exists: !!user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// REGISTERING EMAIL AND NAME
export const registerUser = async (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .json({ success: false, message: "Request body is missing or required" });

  const { email, fullName } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });

  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const user = new User({ fullName, email });
    await user.save();
    return res.status(200).json({ success: true, message: "User created" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// VALIDATING EMAIL
export const sendVerifyEmailOtp = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "Request body is missing or required",
    });
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.isAccountVerified)
      return res
        .status(400)
        .json({ success: false, message: "Account is already verified" });

    if (user.otpLockUntil > new Date())
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Try again later",
      });

    if (user.resendOtpCooldown > new Date()) {
      const waitTime = Math.ceil((user.resendOtpCooldown - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitTime} seconds before requesting another OTP`,
      });
    }
    const otp = generateOTP();
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = new Date(Date.now() + 15 * 60 * 1000);
    user.resendOtpCooldown = new Date(Date.now() + 60 * 1000);
    await user.save();
    sendEmailOtp({
      name: user.fullName,
      to: user.email,
      otp: otp,
    });
    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// VERIFY ACCOUNT
export const checkVerifyEmailOtp = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "Request body is missing or required",
    });
  const { otp, email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "OTP is required" });
  if (!otp)
    return res.status(400).json({ success: false, message: "OTP is required" });

  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  if (otp.length < 6)
    return res
      .status(400)
      .json({ success: false, message: "OTP length must be 6" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.isAccountVerified)
      return res
        .status(400)
        .json({ success: false, message: "Account is already verifed" });

    if (user.otpAttemptCount >= 5) {
      user.otpLockUntil = new Date(Date.now() + 5 * 60 * 1000);
      user.otpAttemptCount = 0;
      await user.save();
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Try again later",
      });
    }

    // Checking expiration time
    if (user.verifyOtpExpiredAt < new Date())
      return res.status(400).json({ success: false, message: "OTP expired" });

    // Assuming user.verifyOtp is hashed (as per your schema pre-save hook)
    if (!(await bcrypt.compare(otp, user.verifyOtp))) {
      user.otpAttemptCount += 1;
      await user.save();
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = null;
    user.resendOtpCooldown = null;
    user.otpAttemptCount = 0;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Verification successfull" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// SETTING USER PASSWORD
export const setUserPassword = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "Request body is missing or required",
    });
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  if (!isValidEmail(email))
    return res.status(400).json({ success: false, message: "Invalid format" });

  if (!isValidPassword(password))
    return res.status(400).json({
      success: false,
      message:
        "Password must be 8-16 chars, include uppercase, lowercase, number, and symbol",
    });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!user.isAccountVerified)
      return res
        .status(400)
        .json({ success: false, message: "Account is not verified" });

    if (user.password !== "")
      return res.status(400).json({
        success: true,
        message: "Cannot set password. A password already exists.",
      });
    user.password = password;
    await user.save();
    sendWelcomeEmail({
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
    const userData = await User.findById(user._id).select(
      "fullName email isAccountVerified _id"
    );
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      userId: userData._id,
      userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// LOGIN AND USER INFO
export const loginUser = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "Request body is missing or required",
    });
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });

  try {
    const user = await User.findOne({ email });

    // Checking account verification
    if (!user.isAccountVerified)
      return res
        .status(400)
        .json({ success: false, message: "Account is not verified" });

    // Cheking usr and password
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const userData = await User.findById(user._id).select(
      "fullName password isAccountVerified _id"
    );

    // Setting cookie
    const token = generateLoginToken(userData._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Successfull response
    return res.status(200).json({
      success: true,
      message: "Login successfull",
      userId: userData._id,
      userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

export const getUserInfo = async (req, res) => {
  if (!req.userId)
    return res.status(400).json({
      success: false,
      message: "UserId is missing or required",
    });
  const userId = req.userId;
  if (!userId)
    return res
      .status(404)
      .json({ success: false, message: "Missing authorization credentials" });

  try {
    const userData = await User.findById(req.user.id).select(
      "fullName email isAccountVerified _id"
    );
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Successfull",
      userId: userData._id,
      userData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// RESET PASSWORD
export const verifyResetToken = (req, res) => {
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "Request body is missing or required",
    });
  const { token } = req.body;
  if (!token)
    return res.status(400).json({ success: false, message: "No token" });
  console.log("invalid token");
  try {
    jwt.verify(token, process.env.RESET_SECRET);
    return res.status(200).json({ success: true, message: "Valid token" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export const resetPasswordLink = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "Request body is missing or required",
    });
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!user.isAccountVerified)
      return res
        .status(400)
        .json({ success: true, message: "Account is not verified" });

    if (user.otpLockUntil > new Date())
      return res.status(429).json({
        success: false,
        message: "Too many request. Try again later.",
      });

    if (user.resendOtpCooldown > new Date()) {
      const waitTime = Math.ceil((user.resendOtpCooldown - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitTime} seconds before requesting another OTP`,
      });
    }

    if (user.otpAttemptCount >= 5) {
      user.otpLockUntil = new Date(Date.now() + 5 * 60 * 1000);
      user.otpAttemptCount = 0;
      await user.save();
      return res.status(429).json({
        success: false,
        message: "Too many request. Try again later.",
      });
    }

    // Generating and sending email
    const resetToken = generateResetPasswordOtp(user._id);
    const resetLink = `${process.env.CLIENT_URL}/reset-password-link?token=${resetToken}`;
    sendResetPasswordEmail({
      to: user.email,
      name: user.fullName,
      resetLink,
    });
    user.resendOtpCooldown = new Date(Date.now() + 60 * 1000);
    user.otpAttemptCount += 1;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset link is sent on the email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

export const resetPassword = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "Request body is missing or required",
    });
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res.status(400).json({ success: false, message: "Missing details" });

  if (!isValidPassword(newPassword))
    return res.status(400).json({
      success: false,
      message:
        "Password must be 8-16 chars, include uppercase, lowercase, number, and symbol",
    });

  let userId = null;
  try {
    const decode = jwt.verify(token, process.env.RESET_SECRET);
    userId = decode.id;
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }

  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    if (!user.isAccountVerified)
      return res
        .status(400)
        .json({ success: false, message: "Account is not verified" });

    user.password = newPassword;
    await user.save();
    sendResetSuccessEmail({
      to: user.email,
      loginUrl: `${process.env.CLIENT_URL}/api/auth/login`,
      name: user.fullName,
    });
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfull" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};
