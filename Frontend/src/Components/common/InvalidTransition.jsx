import React, { useEffect, useState } from "react";
import { AlertTriangle, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function InvalidTransition() {
  const [countdown, setCountdown] = useState(15);
  const navigate = useNavigate();
  // const { resetAllState } = useAuth();
  useEffect(() => {
    // resetAllState();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/login", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          {/* Header with Icon */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Invalid State Transition
            </h1>
            <p className="text-red-50 text-sm">
              Authentication Flow Interrupted
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Something Went Wrong
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We detected an invalid state transition in the authentication
                  flow. This could happen if you navigated using browser
                  controls or if your session was interrupted.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Redirect Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 text-center">
                Redirecting to login page in
              </p>
              <div className="text-4xl font-bold text-red-500 text-center mt-2">
                {countdown}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">seconds</p>
            </div>

            {/* Manual Redirect Button */}
            <button
              onClick={() => {
                navigate("/login", { replace: true });
                console.log("Redirect to /login");
              }}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <span>Go to Login Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Help Text */}
            <p className="text-xs text-gray-500 text-center mt-4">
              If this problem persists, please contact support
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Error Code:{" "}
            <span className="font-mono text-red-600">AUTH_STATE_INVALID</span>
          </p>
        </div>
      </div>
    </div>
  );
}
