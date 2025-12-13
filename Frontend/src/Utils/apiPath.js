

export const API_PATH = {
  AUTH: {
    CHECK: "/api/v1/auth/check-user",
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register-user",
    LOGOUT: "/api/v1/auth/logout",
    GET_USER_INFO: "/api/v1/auth/getUser",
    SEND_OTP: "/api/v1/auth/send-email-otp",
    VERIFY_OTP: "/api/v1/auth/verify-email-otp",
    SET_PASSWORD: "/api/v1/auth/set-password",
    RESET_PASSWORD_LINK: "/api/v1/auth/reset-password-link",
    VERIFY_RESET_TOKEN: "/api/v1/auth/verify-reset-token",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
  },
  TODO: {
    ADD_TODO: "/api/v1/todo/add",
    UPDATE_TODO: (todo_id) => `/api/v1/todo/update/${todo_id}`,
    DELETE_TODO: (todo_id) => `/api/v1/todo/delete/${todo_id}`,
    GET_ALL_TODO: "/api/v1/todo/get",
  },
};
