import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "../../Components/common/AuthLayout";
import Button from "../../Components/common/Button";
import { useAuth } from "../../Context/AuthContext";
import useAuthAction from "../../Hooks/useAuthAction";

const EmailSent = () => {
  const { userEmail } = useAuth();
  const { sendResetTokenLink } = useAuthAction();
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    const { success, message } = await sendResetTokenLink(userEmail, "RESEND");
    setIsLoading(false);

    if (!success) {
      return toast.error(message);
    }
    toast.success(message);
  };

  return (
    <AuthLayout
      title="Check Your Email"
      subtitle={
        <span>
          We've sent a password reset link to <br />
          <span className="font-semibold text-zinc-900">{userEmail}</span>
        </span>
      }
    >
      <div className="space-y-8">
        {/* Success Visual */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100">
            <Mail className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        {/* Instructions Box */}
        <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-zinc-800 mb-2">
                Next Steps:
              </p>
              <ul className="text-sm text-zinc-600 space-y-2">
                <li>• Check your inbox for the reset email</li>
                <li>• Click the link in the email</li>
                <li>• Create your new password</li>
                <li>• Link expires in 15 minutes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resend Section */}
        <div className="text-center space-y-4">
          <p className="text-sm text-zinc-500">
            Didn't receive the email? Check spam or
          </p>

          <Button
            onClick={handleResend}
            variant="outline"
            isLoading={isLoading}
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Click to Resend
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-zinc-400">or</span>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center font-medium text-zinc-600 hover:text-violet-600 transition-colors"
          >
            Back to Login <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmailSent;
