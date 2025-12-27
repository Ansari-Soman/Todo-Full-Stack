import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowRight, AlertTriangle, Timer } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Button from "./Button";

export default function InvalidTransition() {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  return (
    <AuthLayout
      title="Invalid Transition"
      subtitle="Authentication Flow Interrupted"
    >
      <div className="space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100 animate-pulse">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Explanation Box */}
        <div className="bg-red-50/50 border border-red-100 p-5 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-red-900 mb-1">
                Something Went Wrong
              </h3>
              <p className="text-sm text-red-700 leading-relaxed">
                We detected an invalid state transition. This usually happens if
                you try to access a verification page directly without
                completing the previous step.
              </p>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center space-y-2">
          <p className="text-zinc-500 text-sm font-medium">
            Redirecting to login in
          </p>
          <div className="flex items-baseline gap-1 text-zinc-900">
            <Timer className="w-5 h-5 text-zinc-400 self-center mr-2" />
            <span className="text-4xl font-bold tabular-nums tracking-tight">
              {countdown}
            </span>
            <span className="text-zinc-500 text-sm">seconds</span>
          </div>
        </div>

        {/* Manual Redirect Button */}
        <Button
          onClick={() => navigate("/login", { replace: true })}
          className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20"
        >
          Go to Login Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Footer Info */}
        <div className="text-center space-y-2">
          <p className="text-xs text-zinc-400 font-mono">
            Error Code: AUTH_STATE_INVALID
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
