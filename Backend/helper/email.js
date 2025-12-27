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
    to,
    subject: "Reset your password",
    html,
  });
};

export const sendWelcomeEmail = async ({ to, name }) => {
  let html = loadTemplate("../emails/welcomeEmail.html");
  html = html.replace("{{name}}", name);

  return await resend.emails.send({
    from: process.env.SENDER_EMAIL,
    to,
    subject: "Welcome to App",
    html,
  });
};

// Sending account verification otp
export const sendEmailOtp = async ({ to, name, otp }) => {
  let html = loadTemplate("../emails/verifyEmail.html");
  html = html.replace("{{name}}", name).replace("{{otp}}", otp);

  try {
    return await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to,
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
    return await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to,
      subject: "Your Password Was Reset Successfully",
      html,
    });
  } catch (err) {
    console.log("error === ", err);
    throw err;
  }
};
