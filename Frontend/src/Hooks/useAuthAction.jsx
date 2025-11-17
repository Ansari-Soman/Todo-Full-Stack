import React, { useContext } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import { TodoContext } from "../Context/TodoContext";

const useAuthAction = () => {
  const { updateUser } = useContext(TodoContext);
  
  const registerUser = async (fullName, email, password) => {
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        password,
        email,
      });
      const { token, userWithoutPassword } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(userWithoutPassword);
        navigate("/");
      }
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, userWithoutPassword } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        updateUser(userWithoutPassword);
        navigate("/");
      }
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      return { success: false, error: errorMessage };
    }
  };
  return { registerUser, loginUser };
};

export default useAuthAction;
