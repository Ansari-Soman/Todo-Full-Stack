import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../Components/common/AuthLayout";
import Button from "../../Components/common/Button";
import AuthError from "./AuthError";
import useAuthAction from "../../Hooks/useAuthAction";
import { useAuth } from "../../Context/AuthContext";

const VerifyOTP = () => {
  const { userEmail } = useAuth();
  const { verifyOtp, sendOtp } = useAuthAction();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    setIsLoading(true);
    const { success, message } = await verifyOtp(otpCode);
    setIsLoading(false);

    if (!success) {
      return setError(message);
    }
    setError("");
    toast.success(message);
  };

  const handleResend = async () => {
    const { success, message } = await sendOtp(userEmail, "RESEND");
    if (!success) {
      return setError(message);
    }
    setError("");
    toast.success(message);
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={
        <span>
          We've sent a code to{" "}
          <span className="font-semibold text-zinc-800">
            {userEmail || "your email"}
          </span>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={isLoading}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold rounded-xl
                       border-2 border-zinc-200 bg-zinc-50 text-zinc-900
                       focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-zinc-500 mb-2">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-violet-600 font-semibold hover:text-violet-700 hover:underline transition-colors disabled:opacity-50"
          >
            Resend Code
          </button>
        </div>

        {error && <AuthError error={error} />}

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
          variant="primary"
        >
          Verify Email
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-zinc-500 hover:text-zinc-800 transition-colors text-sm"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyOTP;
