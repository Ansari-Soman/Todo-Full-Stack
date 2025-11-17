export const BASE_URL = "http://localhost:8000";

export const API_PATH = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  TODO: {
    ADD_TODO: "/api/v1/todo/add",
    UPDATE_TODO: (todo_id) => `/api/v1/todo/update/${todo_id}`,
    DELETE_TODO: (todo_id) => `/api/v1/todo/delete/${todo_id}`,
    GET_ALL_TODO: "/api/v1/todo/get",
  },
};
