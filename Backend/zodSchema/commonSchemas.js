import { z } from "zod";

// Email field reuse
export const emailField = z
  .string({ required_error: "Email is required" })
  .email("Invalid email format");

// Password (strong rules)
export const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(16, "Password must be at most 16 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

// OTP field
export const otpField = z
  .string()
  .length(6, "OTP must be 6 digits")
  .regex(/^\d{6}$/, "OTP must be 6 digits");
// JWT token field
export const tokenField = z
  .string({ required_error: "Token is required" })
  .min(10, "Invalid token");

// MongoDB ObjectId field
// MongoDB ObjectId field
export const objectIdField = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");
