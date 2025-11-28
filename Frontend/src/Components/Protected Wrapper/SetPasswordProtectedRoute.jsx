import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../common/Loading";

const SetPasswordProtectedRoute = ({ children }) => {
  const { otpStatus, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }

  // Only allow access if OTP is verified
  if (otpStatus !== "verified") {
    return <Navigate to="/verify" replace />;
  }

  return children;
};

export default SetPasswordProtectedRoute;
