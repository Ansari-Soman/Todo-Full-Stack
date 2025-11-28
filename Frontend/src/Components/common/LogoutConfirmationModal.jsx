import React from "react";
import { LogOut, X } from "lucide-react";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }
  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 transition-opacity duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-2xl transform transition-transform duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-6">
            <LogOut className="h-6 w-6 text-red-600" />
          </div>

          {/* Title and Message */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to log out? You will need to sign back in to
              access your to-do lists.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3 sm:flex sm:flex-row-reverse sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md
                         hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Log Out
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
