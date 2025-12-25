import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../common/Loading";

const OTPProtectedRoute = ({ children }) => {
  const { authState, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }

  // Only allow if OTP was sent
  if (authState !== "OTP_SENT") {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default OTPProtectedRoute;
