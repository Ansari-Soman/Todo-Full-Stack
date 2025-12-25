import React, { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import useAuthAction from "./useAuthAction";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { AppProperties } from "../Utils/AppProperties";

const useAuthFlowHandler = () => {
  const {
    authState,
    userEmail,
    pendingUserData,
    setPendingUserData,
    login,
    authRecovery,
    setAuthRecovery,
  } = useAuth();
  const { sendOtp } = useAuthAction();

  const navigate = useNavigate();

  useEffect(() => {
    const handleFlow = async () => {
      if (authState === "IDLE" && authRecovery === "INVALID_TRANSITION") {
        if (AppProperties.MODE === "development") {
          navigate("/invalid-transition", { replace: true });
          return;
        }
        setAuthRecovery(null);
        navigate("/login", { replace: true });
        toast.error("Your session expired. Please start again.");
        return;
      }

      if (authState === "IDLE") {
        navigate("/login", { replace: true });
      } else if (authState === "OTP_REQUIRED") {
        await sendOtp(userEmail);
      } else if (authState === "OTP_SENT") {
        navigate("/verify");
      } else if (authState === "PASSWORD_REQUIRED") {
        navigate("/set-password");
      } else if (authState === "AUTHENTICATED") {
        login(pendingUserData);
        navigate("/dashboard", { replace: true });
        setPendingUserData(null);
      } else if (authState === "NEW_PASSWORD_REQUIRED") {
        navigate("/email-send");
      }
    };
    handleFlow();
  }, [authState, navigate]);
};

export default useAuthFlowHandler;
