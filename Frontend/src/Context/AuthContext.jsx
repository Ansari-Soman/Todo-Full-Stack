import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { checkUser } from "../Services/authService";
import { resetLogoutStatus, setLogoutHandler } from "../Services/authEvents";
import { authStateMachine } from "../Services/authStateMachine";
import { Outlet } from "react-router-dom";
import { AppProperties } from "../Utils/AppProperties";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState("IDLE");
  const [userEmail, setUserEmail] = useState(null);
  const [pendingUserData, setPendingUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accountStatus, setAccountStatus] = useState(null);
  const [authRecovery, setAuthRecovery] = useState(null);
  useEffect(() => {
    const checkSession = async () => {
      const response = await checkUser();
      if (response.success) {
        login(response.userData);
      }
      setLoading(false);
    };
    setLogoutHandler(logout);
    checkSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    resetLogoutStatus();
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const resetAllState = () => {
    setAuthState("IDLE");
    setUserEmail(null);
    setUser(null);
    setIsAuthenticated(false);
    setAccountStatus(null);
  };
  const handleAuthState = (next) => {
    try {
      const nextState = authStateMachine(authState, next);
      setAuthState(nextState);
    } catch (error) {
      if (AppProperties.MODE === "development") {
        console.log("State machine error == ", error);
      }
      resetAllState();
      setAuthRecovery("INVALID_TRANSITION");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        accountStatus,
        setAccountStatus,
        userEmail,
        setUserEmail,
        authState,
        setAuthState,
        handleAuthState,
        resetAllState,
        pendingUserData,
        setPendingUserData,
        authRecovery,
        setAuthRecovery,
      }}
    >
      <Outlet />
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
