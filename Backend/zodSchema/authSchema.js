import { z } from "zod";
import {
  emailField,
  passwordField,
  otpField,
  tokenField,
  objectIdField,
} from "./commonSchemas.js";

// REGISTER USER
export const registerUserSchema = {
  query: z.object({
    email: emailField,
    fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  }),
};

// SEND OTP
export const sendVerifyEmailOtpSchema = {
  body: z.object({
    email: emailField,
  }),
};

// CHECK OTP
export const checkVerifyEmailOtpSchema = {
  body: z.object({
    email: emailField,
    otp: otpField,
  }),
};

// SET PASSWORD
export const setUserPasswordSchema = {
  body: z.object({
    email: emailField,
    password: passwordField,
  }),
};

// LOGIN USER
export const loginUserSchema = {
  body: z.object({
    email: emailField,
    password: z.string().min(1, "Password is required"),
  }),
};

// USER ID (for controllers using :userId param)
export const userIdSchema = {
  params: z.object({
    userId: objectIdField,
  }),
};

// ONLY TOKEN (JWT)
export const tokenSchema = {
  body: z.object({
    token: tokenField,
  }),
};

// TOKEN + NEW PASSWORD
export const tokenPasswordSchema = {
  body: z.object({
    token: tokenField,
    newPassword: passwordField,
  }),
};

// CHECK USER EXISTS
export const checkUserExistSchema = {
  body: z.object({
    email: emailField,
  }),
};
