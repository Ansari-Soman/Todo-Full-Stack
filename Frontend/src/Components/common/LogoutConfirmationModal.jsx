import React from "react";
import { LogOut, X } from "lucide-react";
import Button from "./Button";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 scale-100 transition-all border border-zinc-100">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
            <LogOut size={24} />
          </div>
          <h3 className="text-xl font-bold text-zinc-800">Log Out?</h3>
          <p className="text-zinc-500 text-sm mt-2">
            Are you sure you want to sign out? You will need to login again to
            access your tasks.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
            className="flex-1 bg-red-600 hover:bg-red-700 shadow-red-500/20"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
