import { use, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import { useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [otpStatus, setOtpStatus] = useState(null);
  const [resetEmailStatus, setResetEmailStatus] = useState(null);
  const [accountStatus, setAccountStatus] = useState(null);
  const [resetTokenStatus, setResetTokenStatus] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);
      if (response.data?.userData) {
        login(response.data?.userData);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        otpStatus,
        setOtpStatus,
        resetTokenStatus,
        setResetTokenStatus,
        accountStatus,
        setAccountStatus,
        userEmail,
        setUserEmail,
        resetEmailStatus,
        setResetEmailStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
