import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Loading from "../Components/common/Loading";

const NonPrivateWrapper = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user && !isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default NonPrivateWrapper;
