import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { handleApiRequest } from "../Utils/handleApiRequest";
import { AppError } from "../Utils/AppError";

const useAuthAction = () => {
  const {
    userEmail,
    setUserEmail,
    handleAuthState,
    setPendingUserData,
  } = useAuth();

  // Register user
  const registerUser = handleApiRequest(async (fullName, email) => {
    const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
      fullName,
      email,
    });
    setUserEmail(email);
    handleAuthState("REGISTER_SUCCESS");
    return { success: true, message: response.message };
  });

  // Login user
  const loginUser = handleApiRequest(async (email, password) => {
    const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
      email,
      password,
    });
    if (!response?.userData) {
      throw new AppError("Login response missing userData");
    }
    handleAuthState("LOGIN_SUCCESS");
    setPendingUserData(response.userData);
    return { success: true, message: response.message };
  });

  const logoutUser = handleApiRequest(async () => {
    const response = await axiosInstance.post(API_PATH.AUTH.LOGOUT);
    handleAuthState("LOGOUT_SUCCESS");
    return {
      success: true,
      message: response.message,
    };
  });

  const sendOtp = handleApiRequest(async (email, source) => {
    if (!userEmail) throw new AppError("verifyOtp called without userEmail");
    const otpResponse = await axiosInstance.post(API_PATH.AUTH.SEND_OTP, {
      email,
    });
    if (otpResponse?.otpStatus !== "sent") {
      throw new AppError("Otp status is not sent", {
        userMessage: "Failed to send the OTP",
      });
    }
    if (source === "FLOW") {
      handleAuthState("OTP_SENT_SUCCESS");
    }
    return { success: true, message: otpResponse.message };
  });

  // Verifying otp
  const verifyOtp = handleApiRequest(async (otp) => {
    if (!userEmail) throw new AppError("verifyOtp called without userEmail");

    const response = await axiosInstance.post(API_PATH.AUTH.VERIFY_OTP, {
      email: userEmail,
      otp,
    });

    if (response?.otpStatus !== "verified") {
      throw new AppError("Otp verification failed", {
        userMessage: "Invalid OTP",
      });
    }
    handleAuthState("OTP_VERIFIED_SUCCESS");
    return { success: true, message: response.message };
  });

  // Set password
  const registerPassword = handleApiRequest(async (password) => {
    if (!userEmail)
      throw new AppError("registerPassword called without userEmail");

    const response = await axiosInstance.put(API_PATH.AUTH.SET_PASSWORD, {
      email: userEmail,
      password,
    });
    if (response?.accountStatus !== "activated") {
      throw new AppError("accountStatus is not activated");
    }
    handleAuthState("PASSWORD_SET_SUCCESS");
    setPendingUserData(response.userData);

    return { success: true, message: response.message };
  });

  // Send reset token
  const sendResetTokenLink = handleApiRequest(async (email, source) => {
    const response = await axiosInstance.post(
      API_PATH.AUTH.RESET_PASSWORD_LINK,
      { email }
    );
    setUserEmail(email);
    if (source === "FLOW") {
      handleAuthState("RESET_LINK_SENT_SUCCESS");
    }
    return { success: true, message: response.message };
  });

  // Verify reset token
  const verifyResetToken = handleApiRequest(async (token) => {
    const response = await axiosInstance.post(
      API_PATH.AUTH.VERIFY_RESET_TOKEN,
      { token }
    );
    return { success: true };
  });

  // Reset password
  const resetPassword = handleApiRequest(async (token, password) => {
    const response = await axiosInstance.put(API_PATH.AUTH.RESET_PASSWORD, {
      token,
      newPassword: password,
    });
    handleAuthState("RESET_PASSWORD_SUCCESS");
    return { success: true, message: response.message };
  });

  return {
    registerUser,
    loginUser,
    verifyOtp,
    registerPassword,
    sendResetTokenLink,
    resetPassword,
    verifyResetToken,
    logoutUser,
    sendOtp,
  };
};

export default useAuthAction;
