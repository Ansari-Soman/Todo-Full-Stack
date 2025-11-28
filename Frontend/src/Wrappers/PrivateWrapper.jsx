import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Loading from "../Components/common/Loading";
const PrivateWrapper = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  if (user && isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateWrapper;
