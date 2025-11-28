import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../common/Loading";
import InvalidToken from "../../Pages/Auth/InvalidToken";
import useAuthAction from "../../Hooks/useAuthAction";

const ResetPasswordProtectedRoute = ({ children }) => {
  const { verifyResetToken } = useAuthAction();
  const [tokenStatus, setTokenStatus] = useState("checking");

  const [params] = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    const check = async () => {
      const result = await verifyResetToken(token);
      setTokenStatus(result.success ? "valid" : "invalid");
    };

    check();
  }, [tokenStatus, verifyResetToken]);

  if (tokenStatus === "checking") return <Loading />;
  if (tokenStatus === "invalid") return <InvalidToken />;
  if (tokenStatus === "valid") return children;

  return null; // fallback (should never reach)
};

export default ResetPasswordProtectedRoute;
