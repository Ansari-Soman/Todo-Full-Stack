import React from "react";
import { XCircle, Repeat, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useAuthAction from "../../Hooks/useAuthAction";
import toast from "react-hot-toast";

const InvalidToken = () => {
  const { userEmail } = useAuth();
  const { sendResetTokenLink } = useAuthAction();
  const handleRequestNewLink = async () => {
    const { success, message } = await sendResetTokenLink(userEmail, "RESEND");
    if (!success) {
      return toast.error(message);
    }
    toast.success(message);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-md">
        {/* Invalid Token Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border-t-8 border-red-600">
          {/* Error Icon and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 shadow-lg">
              <XCircle className="w-10 h-10 text-red-600 animate-pulse" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
              Link Invalid or Expired
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We couldn't process your request. Please review the reasons below.
            </p>
          </div>

          {/* Instructions / Reasons */}
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {/* Warning SVG icon */}
                <svg
                  className="w-5 h-5 text-red-600 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li>
                    • The link has timed out (it was likely active for 15-60
                    minutes).
                  </li>
                  <li>
                    • You have already successfully reset your password using
                    this link.
                  </li>
                  <li>
                    • The link was partially copied or corrupted during
                    delivery.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRequestNewLink}
              className="w-full flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-600 to-orange-700 text-white font-semibold rounded-lg
                         shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-800 transition-all duration-200 transform hover:scale-[1.01]"
            >
              <Repeat className="w-5 h-5 mr-2" />
              Request a New Reset Link
            </button>

            <Link
              to="/login"
              className="w-full flex items-center justify-center px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg
                         shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Login Page
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          If you continue to experience issues, please{" "}
          <a
            href="mailto:support@todoapp.com"
            className="text-red-600 hover:text-red-700 hover:underline font-medium"
          >
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default InvalidToken;
