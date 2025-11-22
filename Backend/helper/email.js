import { error } from "console";
import resend from "../Config/resend.js";
import fs from "fs";
import path from "path";

const loadTemplate = (fileName) => {
  const filePath = path.join(process.cwd(), "emails", fileName);
  return fs.readFileSync(filePath, "utf8");
};

export const sendResetPasswordEmail = async ({ to, name, resetLink }) => {
  let html = loadTemplate("../emails/resetPassword.html");
  html = html.replace("{{name}}", name).replace("{{resetLink}}", resetLink);

  return await resend.emails.send({
    from: process.env.SENDER_EMAIL,
    to: "ansari40953@gmail.com",
    subject: "Reset your password",
    html,
  });
};

export const sendWelcomeEmail = async ({ to, name }) => {
  let html = loadTemplate("../emails/resetPassword.html");
  html = html.replace("{{name}}", name);

  return await resend.emails.send({
    from: process.env.SENDER_EMAIL,
    to: "ansari40953@gmail.com",
    subject: "Welcome to App",
    html,
  });
};

export const sendEmailOtp = async ({ to, name, otp }) => {
  let html = loadTemplate("../emails/verifyEmail.html");
  html = html.replace("{{name}}", name).replace("{{otp}}", otp);

  try {
    return await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: "ansari40953@gmail.com",
      subject: "Email verification",
      html: html,
    });
  } catch (err) {
    console.log("error === ", err);
  }
};

// Send success password reset email
export const sendResetSuccessEmail = async ({ to, loginUrl, name }) => {
  let html = loadTemplate("../emails/resetSuccess.html");

  html = html
    .replace("{{loginUrl}}", loginUrl)
    .replace("{{name}}", name || "there");

  try {
    const result = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: "ansari40953@gmail.com",
      subject: "Your Password Was Reset Successfully",
      html,
    });
  } catch (err) {
    console.log("error === ", err);
  }
};
