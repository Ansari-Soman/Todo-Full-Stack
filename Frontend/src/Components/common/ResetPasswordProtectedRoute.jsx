import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "./Loading";

const ResetPasswordProtectedRoute = ({ children }) => {
  const { resetTokenStatus, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }

  // Only allow if reset token is valid
  if (resetTokenStatus !== "valid") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ResetPasswordProtectedRoute;
