import React from "react";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../common/Loading";
import { Navigate } from "react-router-dom";

const EmailSendProtected = ({ children }) => {
  const { loading, authState } = useAuth();
  if (loading) return <Loading />;
  // Only allow if OTP was sent
  if (authState !== "NEW_PASSWORD_REQUIRED") {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default EmailSendProtected;
