import React, { useState } from "react";
import { Link } from "react-router-dom";
import { XCircle, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "../../Components/common/AuthLayout";
import Button from "../../Components/common/Button";
import { useAuth } from "../../Context/AuthContext";
import useAuthAction from "../../Hooks/useAuthAction";

const InvalidToken = () => {
  const { userEmail } = useAuth();
  const { sendResetTokenLink } = useAuthAction();
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestNewLink = async () => {
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
      title="Link Invalid or Expired"
      subtitle="We couldn't process your request"
    >
      <div className="space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Reasons Box */}
        <div className="bg-red-50 border border-red-100 p-5 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-2">
                Possible Reasons:
              </p>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• The link has timed out (expired)</li>
                <li>• You have already used this link</li>
                <li>• The link was copied incorrectly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleRequestNewLink}
            isLoading={isLoading}
            variant="primary"
            className="w-full bg-red-600 hover:bg-red-700 text-white shadow-red-500/20" 
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Request New Link
          </Button>

          <Link to="/login" className="block w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-center text-sm text-zinc-500">
          Still having trouble?{" "}
          <a
            href="mailto:support@todoapp.com"
            className="text-red-600 hover:text-red-700 font-medium underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default InvalidToken;
