import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { minLength } from "zod";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 8 },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpiredAt: { type: Date, default: null },
    isAccountVerified: { type: Boolean, default: false },
    resendOtpCooldown: { type: Date, default: null },
    otpAttemptCount: { type: Number, default: 0 },
    otpLockUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

// Deleting unverified user after 1 hour
UserSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 3600,
    partialFilterExpression: { isAccountVerified: false },
  }
);

// Hashing password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isModified("verifyOtp")) {
    this.verifyOtp = await bcrypt.hash(this.verifyOtp, 10);
  }
  return next();
});

//Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
