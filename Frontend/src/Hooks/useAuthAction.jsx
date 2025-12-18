import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { handleRequest } from "../Utils/handleRequest";
import { AppError } from "../Utils/AppError";

const useAuthAction = () => {
  const {
    login,
    setOtpStatus,
    setAccountStatus,
    userEmail,
    setUserEmail,
    setResetEmailStatus,
  } = useAuth();
  const navigate = useNavigate();

  // Register user
  const registerUser = handleRequest(async (fullName, email) => {
    const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
      fullName,
      email,
    });

    setUserEmail(email);
    // If success send the otp
    const otpResponse = await sendOtp(email);
    setOtpStatus("sent");
    navigate("/verify");
    return { success: true, message: otpResponse.message };
  });

  // Login user
  const loginUser = handleRequest(async (email, password) => {
    const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
      email,
      password,
    });
    if (!response?.userData) {
      throw new AppError("Login response missing userData");
    }
    login(response.userData);
    navigate("/dashborad", { replace: true });
    return { success: true, message: response.message };
  });

  const logoutUser = handleRequest(async () => {
    const response = await axiosInstance.post(API_PATH.AUTH.LOGOUT);
    logout();
    navigate("/login", { replace: true });
    return {
      success: true,
      message: response.message,
    };
  });

  const sendOtp = handleRequest(async (email) => {
    const otpResponse = await axiosInstance.post(API_PATH.AUTH.SEND_OTP, {
      email,
    });
    if (otpResponse?.otpStatus !== "sent") {
      throw new AppError("Otp status is not sent", {
        userMessage: "Failed to send the OTP",
      });
    }

    return { success: true, message: otpResponse.message };
  });

  // Verifying otp
  const verifyOtp = handleRequest(async (otp) => {
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

    setOtpStatus("verified");
    navigate("/set-password");
    return { success: true, message: response.message };
  });

  // Set password
  const registerPassword = handleRequest(async (password) => {
    if (!userEmail)
      throw new AppError("registerPassword called without userEmail");

    const response = await axiosInstance.put(API_PATH.AUTH.SET_PASSWORD, {
      email: userEmail,
      password,
    });
    if (response?.accountStatus !== "activated") {
      throw new AppError("accountStatus is not activated");
    }
    setAccountStatus("activated");
    login(response.userData);
    navigate("/dashboard", { replace: true });
    return { success: true, message: response.message };
  });

  // Send reset token
  const sendResetTokenLink = handleRequest(async (email) => {
    const response = await axiosInstance.post(
      API_PATH.AUTH.RESET_PASSWORD_LINK,
      { email }
    );
    setResetEmailStatus("sent");
    navigate("/email-send");
    setUserEmail(email);
    return { success: true, message: response.message };
  });

  // Verify reset token
  const verifyResetToken = handleRequest(async (token) => {
    const response = await axiosInstance.post(
      API_PATH.AUTH.VERIFY_RESET_TOKEN,
      { token }
    );
    return { success: true };
  });

  // Reset password
  const resetPassword = handleRequest(async (token, password) => {
    const response = await axiosInstance.put(API_PATH.AUTH.RESET_PASSWORD, {
      token,
      newPassword: password,
    });
    navigate("/login");
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
  };
};

export default useAuthAction;
