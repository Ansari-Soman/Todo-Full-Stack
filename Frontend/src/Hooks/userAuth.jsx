import { useContext, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";

const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(TodoContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const token = localStorage.getItem("token");

    // If no token → redirect to login ONLY if not already on login page
    if (!token) {
      console.log("In the clearUser");
      clearUser();
      if (location.pathname !== "/login") {
        navigate("/login");
      }
      return;
    }

    if (user) return;
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);

        if (isMounted && response?.data) {
          updateUser(response.data);

          // Save to localStorage also (optional)
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (error) {
        if (isMounted) {
          clearUser();
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          if (location.pathname !== "/login") {
            navigate("/login");
          }
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate, location.pathname]);

  return user;
};

export default useUserAuth;
