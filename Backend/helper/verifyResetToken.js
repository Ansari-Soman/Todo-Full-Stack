import User from "../Model/User.js";
import { hashOpaqueToken } from "./helper.js";

export const verifyResetTokenHelper = async (token) => {
  const userhashOpaqueToken = hashOpaqueToken(token);
  const user = await User.findOne({
    resetPasswordTokenHash: userhashOpaqueToken,
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.resetPasswordExpiresAt < Date.now()) {
    throw new Error("Invalid or Expired token");
  }
  return user;
};
