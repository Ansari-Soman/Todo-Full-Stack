import React from "react";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../common/Loading";
import { Navigate } from "react-router-dom";

const EmailSendProtected = ({ children }) => {
  const { loading, resetEmailStatus } = useAuth();
  if (loading) return <Loading />;
  // Only allow if OTP was sent
  if (resetEmailStatus !== "sent") {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default EmailSendProtected;
