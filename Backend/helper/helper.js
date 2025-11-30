import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const generateOTP = () => String(crypto.randomInt(100000, 1000000));
export const generateResetPasswordOtp = (id) =>
  jwt.sign({ id }, process.env.RESET_SECRET, { expiresIn: "15m" });

export const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const deleteCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
};

export const setUserData = (user) => {
  const userData = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    isAccountVerified: user.isAccountVerified,
  };
  return userData;
};
