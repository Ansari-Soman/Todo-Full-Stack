import { API_PATH } from "../Utils/apiPath";
import axiosInstance from "../Utils/axiosInstance";

export const checkUser = async () => {
  try {
    const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);
    if (response.success) {
      return {
        success: true,
        message: response.message,
        userData: response.userData,
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
