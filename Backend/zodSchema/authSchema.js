import { z } from "zod";
import {
  emailField,
  passwordField,
  otpField,
  tokenField,
  objectIdField,
} from "./commonSchemas.js";

export const registerUserSchema = z.object({
  email: emailField,
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
});
export const sendVerifyEmailOtpSchema = z.object({
  email: emailField,
});

export const checkVerifyEmailOtpSchema = z.object({
  email: emailField,
  otp: otpField,
});

export const setUserPasswordSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const loginUserSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});

// ✔ For controller that requires userId
export const userIdSchema = z.object({
  userId: objectIdField,
});

// ✔ For controller that requires only token (JWT)
export const tokenSchema = z.object({
  token: tokenField,
});

// ✔ For controller that requires token + newPassword
export const tokenPasswordSchema = z.object({
  token: tokenField,
  newPassword: passwordField,
});

export const checkUserExistSchema = z.object({
  email: emailField,
});
