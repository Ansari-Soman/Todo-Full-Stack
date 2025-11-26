import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          {/* Floating 404 with Emoji */}
          <div className="mb-8 animate-bounce">
            <div className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              4🤔4
            </div>
          </div>

          {/* Fun Message */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Well, this is awkward...
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto mb-4">
              We searched everywhere, but couldn't find what you're looking for.
              Maybe it's taking a coffee break? ☕
            </p>
            <p className="text-gray-500 text-sm">
              Error Code: <span className="font-mono font-semibold">404</span>
            </p>
          </div>

          {/* Search Suggestion Box */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg mb-8 text-left max-w-md mx-auto">
            <p className="text-sm text-gray-700 font-medium mb-2">
              💡 Possible reasons:
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li>• The page was moved or deleted</li>
              <li>• You typed the URL incorrectly</li>
              <li>• The link you clicked is outdated</li>
              <li>• We're still building this feature</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg
                       hover:from-blue-600 hover:to-blue-700 
                       transition-all duration-200 shadow-lg hover:shadow-xl
                       transform hover:scale-105"
            >
              🏠 Back to Home
            </Link>

            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-lg
                       hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md
                       transform hover:scale-105"
            >
              ← Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-3 text-sm">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Login
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
