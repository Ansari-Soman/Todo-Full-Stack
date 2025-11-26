import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "./Loading";

const SetPasswordProtectedRoute = ({ children }) => {
  const { otpStatus, loading } = useAuth();
  console.log("set pass pro == ", loading, otpStatus);
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
