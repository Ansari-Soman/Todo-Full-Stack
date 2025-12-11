import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthAction from "../../Hooks/useAuthAction";
import AuthError from "./AuthError";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { verifyOtp } = useAuthAction();
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    const otpCode = otp.join("");
    const response = await verifyOtp(otpCode);
    if (!response.success) {
      return setError(response.error);
    }
    toast.success(response.message);
  };

  const handleResend = () => {
    // Add your resend OTP logic here
    console.log("Resend OTP");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-500">
              We've sent a code to{" "}
              <span className="font-semibold text-gray-700">
                your@email.com
              </span>
            </p>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Boxes */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                           transition-all duration-200"
                />
              ))}
            </div>

            {/* Timer/Resend */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                Resend Code
              </button>
            </div>
            {/* Error Message */}
            {error && <AuthError error={error} />}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg py-3 rounded-lg
                       hover:from-blue-600 hover:to-blue-700 
                       active:from-blue-700 active:to-blue-800
                       transition-all duration-200 shadow-lg hover:shadow-xl
                       transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Verify Email
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
