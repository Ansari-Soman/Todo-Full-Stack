import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

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
  const registerUser = async (fullName, email) => {
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
      });
      // If success send the otp
      if (response?.success === true) {
        const otpResponse = await sendOtp(email);
        if (
          otpResponse?.success === true &&
          otpResponse?.otpStatus === "sent"
        ) {
          setUserEmail(email);
          setOtpStatus("sent");
          navigate("/verify");
          return { success: true, message: otpResponse.message };
        }
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });
      if (response?.success === true && response?.userData) {
        login(response.userData);
        navigate("/");
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGOUT);
      if (response?.success) {
        return {
          success: true,
          message: response.message,
        };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const sendOtp = async (email) => {
    try {
      const otpResponse = await axiosInstance.post(API_PATH.AUTH.SEND_OTP, {
        email,
      });
      if (otpResponse?.success === true && otpResponse?.otpStatus === "sent") {
        return { success: true, message: otpResponse.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Verifying otp
  const verifyOtp = async (otp) => {
    if (!userEmail) return;

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.VERIFY_OTP, {
        email: userEmail,
        otp,
      });
      if (response?.success === true && response?.otpStatus === "verified") {
        setOtpStatus("verified");
        navigate("/set-password");
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Set password
  const registerPassword = async (password) => {
    if (!userEmail) return;
    try {
      const response = await axiosInstance.put(API_PATH.AUTH.SET_PASSWORD, {
        email: userEmail,
        password,
      });
      if (
        response?.success === true &&
        response?.accountStatus === "activated"
      ) {
        setAccountStatus("activated");
        if (response.userData) {
          login(response.userData);
        }
        navigate("/");
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Send reset token
  const sendResetTokenLink = async (email) => {
    try {
      const response = await axiosInstance.post(
        API_PATH.AUTH.RESET_PASSWORD_LINK,
        { email }
      );
      if (response?.success === true) {
        setResetEmailStatus("sent");
        navigate("/email-send");
        setUserEmail(email);
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Verify reset token
  const verifyResetToken = async (token) => {
    try {
      const response = await axiosInstance.post(
        API_PATH.AUTH.VERIFY_RESET_TOKEN,
        { token }
      );
      if (response?.resetTokenStatus === "valid") {
        return { success: true };
      }
      return {
        success: false,
        error: response.message || "Invalid or expired token",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      const response = await axiosInstance.put(API_PATH.AUTH.RESET_PASSWORD, {
        token,
        newPassword: password,
      });
      if (response?.success === true) {
        navigate("/login");
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

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
