import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../Components/common/AuthLayout";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";
import AuthError from "./AuthError";
import useAuthAction from "../../Hooks/useAuthAction";
import { isValidEmail } from "../../Utils/validator";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { loginUser } = useAuthAction();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setIsLoading(true);

    const { success, message } = await loginUser(email, password);
    setIsLoading(false);

    if (!success) {
      setError(message);
      return;
    }
    toast.success(message);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your tasks"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <Input
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <div className="space-y-2">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && <AuthError error={error} />}

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
          variant="primary"
        >
          Sign In
        </Button>

        <p className="text-center text-zinc-500 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline transition-colors"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
