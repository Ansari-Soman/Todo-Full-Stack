import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../Components/common/AuthLayout";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";
import AuthError from "./AuthError";
import useAuthAction from "../../Hooks/useAuthAction";
import { useAuth } from "../../Context/AuthContext";
import { Check, X } from "lucide-react";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuthAction();
  const { userEmail } = useAuth();

  // Validation Rules
  const validationRules = useMemo(() => {
    return {
      length: password.length >= 8 && password.length <= 16,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[\W_]/.test(password),
      notEmail: userEmail
        ? password.toLowerCase() !== userEmail.toLowerCase()
        : true,
      match:
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword,
    };
  }, [password, confirmPassword, userEmail]);

  const allValid = Object.values(validationRules).every(
    (rule) => rule === true
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allValid) return;

    setIsLoading(true);
    const { success, message } = await resetPassword(token, password);
    setIsLoading(false);

    if (!success) {
      return setError(message);
    }
    toast.success(message);
    navigate("/login", { replace: true });
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          placeholder="Enter new password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />

        {/* Validation Checklist */}
        <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-3">
          <p className="text-sm font-semibold text-zinc-700">
            Password Requirements:
          </p>
          <ul className="space-y-2">
            <ValidationItem
              isValid={validationRules.length}
              text="8-16 characters long"
            />
            <ValidationItem
              isValid={validationRules.uppercase}
              text="One uppercase letter (A-Z)"
            />
            <ValidationItem
              isValid={validationRules.lowercase}
              text="One lowercase letter (a-z)"
            />
            <ValidationItem
              isValid={validationRules.number}
              text="One number (0-9)"
            />
            <ValidationItem
              isValid={validationRules.special}
              text="One special character (!@#$%^&*)"
            />
            <ValidationItem
              isValid={validationRules.notEmail}
              text="Cannot be your email address"
            />
            {confirmPassword && (
              <ValidationItem
                isValid={validationRules.match}
                text="Passwords match"
              />
            )}
          </ul>
        </div>

        {error && <AuthError error={error} />}

        <Button
          type="submit"
          disabled={!allValid || isLoading}
          isLoading={isLoading}
          className="w-full"
          variant={allValid ? "primary" : "ghost"}
        >
          {allValid ? "Reset Password" : "Complete Requirements"}
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

// Sub-component for checklist items
const ValidationItem = ({ isValid, text }) => (
  <li className="flex items-center text-sm gap-3">
    <div
      className={`
      w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200
      ${isValid ? "bg-emerald-500 text-white" : "bg-zinc-200 text-zinc-400"}
    `}
    >
      {isValid ? (
        <Check size={12} strokeWidth={3} />
      ) : (
        <X size={12} strokeWidth={3} />
      )}
    </div>
    <span
      className={`transition-colors duration-200 ${
        isValid ? "text-emerald-700 font-medium" : "text-zinc-500"
      }`}
    >
      {text}
    </span>
  </li>
);

export default ResetPassword;
