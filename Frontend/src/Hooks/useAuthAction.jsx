import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

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
      if (response.data?.success === true) {
        const response = await axiosInstance.post(API_PATH.AUTH.SEND_OTP, {
          email,
        });

        if (
          response?.data?.success === true &&
          response?.data?.otpStatus === "sent"
        ) {
          setUserEmail(email);
          setOtpStatus("sent");
          navigate("/verify");
          toast.success("OTP has been sent to your email successfully.");
          return { success: true };
        }
      }
      return { success: false, error: "OTP sending failed" };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.errors[0] ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      if (response?.data?.success === true && response?.data?.userData) {
        login(response.data.userData);
        navigate("/");
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors[0] ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
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
      if (
        response?.data?.success === true &&
        response?.data?.otpStatus === "verified"
      ) {
        setOtpStatus("verified");
        navigate("/set-password");
        toast.success("OTP verification successful.");
      }
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors[0] ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  // Set password
  const registertPassword = async (password) => {
    if (!userEmail) return;
    try {
      const response = await axiosInstance.put(API_PATH.AUTH.SET_PASSWORD, {
        email: userEmail,
        password,
      });
      if (
        response?.data?.success === true &&
        response?.data?.accountStatus === "activated"
      ) {
        setAccountStatus("activated");
        login(response.data.userData);
        navigate("/");
        toast.success("Registration successful");
      }
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors[0] ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  // Send reset token
  const sendResetTokenLink = async (email) => {
    try {
      const response = await axiosInstance.post(
        API_PATH.AUTH.RESET_PASSWORD_LINK,
        { email }
      );
      if (response?.data?.success === true) {
        setResetEmailStatus("sent");
        navigate("/email-send");
        toast.success("Password reset link sent to your email");
      }
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors[0] ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  // Verify reset token
  const verifyResetToken = async (token) => {
    try {
      const response = await axiosInstance.post(
        API_PATH.AUTH.VERIFY_RESET_TOKEN,
        { token }
      );
      if (response?.data?.resetTokenStatus === "valid") {
        return { success: true };
      }
      return { success: false, error: "Invalid or expired token" };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors[0] ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      const response = await axiosInstance.put(API_PATH.AUTH.RESET_PASSWORD, {
        token,
        newPassword: password,
      });
      if (response?.data?.success === true) {
        navigate("/login");
        toast.success("Password reset successful");
      }
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors[0] ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };
  return {
    registerUser,
    loginUser,
    verifyOtp,
    registertPassword,
    sendResetTokenLink,
    resetPassword,
    verifyResetToken,
  };
};

export default useAuthAction;
