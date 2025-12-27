import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useAuthAction from "../../Hooks/useAuthAction";
import toast from "react-hot-toast";

const EmailSent = () => {
  const { userEmail } = useAuth();
  const { sendResetTokenLink } = useAuthAction();
  const handleResend = async () => {
    // Add your resend email logic here
    const { success, message } = await sendResetTokenLink(userEmail, "RESEND");
    if (!success) {
      return toast.error(message);
    }
    toast.success(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Email Sent Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg animate-bounce">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Check Your Email
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We've sent a password reset link to
            </p>
            <p className="text-blue-600 font-semibold text-lg mt-2">
              {userEmail}
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Next Steps:
                </p>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>• Check your inbox for the reset email</li>
                  <li>• Click the link in the email</li>
                  <li>• Create your new password</li>
                  <li>• Link expires in 15 minutes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Didn't receive email? */}
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <p className="text-sm text-gray-700 font-medium mb-3">
              Didn't receive the email?
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Check your spam or junk folder</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Make sure you entered the correct email</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Wait a few minutes and check again</span>
              </li>
            </ul>
            <button
              onClick={handleResend}
              className="w-full bg-white border-2 border-blue-500 text-blue-600 font-semibold py-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              Resend Email
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Back to Login */}
          <Link
            to="/login"
            className="flex items-center justify-center w-full text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </Link>
        </div>

        {/* Help Text - CORRECTED SECTION */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help?{" "}
          <a
            href="mailto:support@todoapp.com"
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
