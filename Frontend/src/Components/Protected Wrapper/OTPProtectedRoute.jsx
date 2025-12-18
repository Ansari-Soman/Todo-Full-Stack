import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../common/Loading";

const OTPProtectedRoute = ({ children }) => {
  const { otpStatus, loading, userEmail } = useAuth();
  if (loading) {
    return <Loading />;
  }

  // Only allow if OTP was sent
  if (!userEmail && otpStatus !== "sent" && otpStatus !== "verified") {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default OTPProtectedRoute;
