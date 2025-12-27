import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../Components/common/AuthLayout";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";
import AuthError from "./AuthError";
import useAuthAction from "../../Hooks/useAuthAction";

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { sendResetTokenLink } = useAuthAction();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { success, message } = await sendResetTokenLink(email, "FLOW");
    setIsLoading(false);

    if (!success) {
      return setError(message);
    }
    setError(null);
    toast.success(message);
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="No worries! Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />

        {error && <AuthError error={error} />}

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
          variant="primary"
        >
          Send Reset Link
        </Button>

        <div className="text-center space-y-4">
          <Link
            to="/login"
            className="block text-zinc-500 hover:text-zinc-800 transition-colors text-sm"
          >
            ← Back to Login
          </Link>

          <p className="text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-violet-600 hover:text-violet-700 hover:underline transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordEmail;
