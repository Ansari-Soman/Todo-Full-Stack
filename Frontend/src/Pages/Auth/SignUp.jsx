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

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { registerUser } = useAuthAction();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);

    const response = await registerUser(fullName, email);

    setIsLoading(false);

    if (!response.success) {
      setError(response.message);
      return;
    }
    toast.success(response.message);
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start your journey with us">
      <form onSubmit={handleSignUp} className="space-y-6">
        <Input
          label="Full Name"
          placeholder="John Doe"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isLoading}
        />

        <Input
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        {error && <AuthError error={error} />}

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
          variant="primary"
        >
          Sign Up
        </Button>

        <p className="text-center text-zinc-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline transition-colors"
          >
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
