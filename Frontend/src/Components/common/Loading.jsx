import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">
      <div className="text-center space-y-4">
        {/* Violet Spinner */}
        <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto" />

        {/* Soft Text */}
        <p className="text-zinc-500 font-medium tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
