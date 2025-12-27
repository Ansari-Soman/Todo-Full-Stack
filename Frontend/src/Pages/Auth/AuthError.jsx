import React from "react";
import { AlertCircle } from "lucide-react";

const AuthError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm font-medium leading-relaxed">{error}</p>
    </div>
  );
};

export default AuthError;
