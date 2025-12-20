import React, { useContext } from "react";
import toast from "react-hot-toast";
import { API_PATH } from "../Utils/apiPath";
import axiosInstance from "../Utils/axiosInstance";
import { TodoContext } from "../Context/TodoContext";
import { handleRequest } from "../Utils/handleRequest";

const useTodoManager = () => {
  const { setTodoList } = useContext(TodoContext);

  // Add one todo
  const addTodo = handleRequest(async (todoName, date) => {
    if (!todoName.trim() || !date) {
      return { success: false, message: "Name and date are required." };
    }
    const response = await axiosInstance.post(API_PATH.TODO.ADD_TODO, {
      todoName,
      date,
    });
    await getAllTodos();
    return { success: true, message: response.message };
  });

  // Get All Todos
  const getAllTodos = handleRequest(async () => {
    const response = await axiosInstance.get(API_PATH.TODO.GET_ALL_TODO);
    setTodoList(response.todos);
    return { success: true, message: response.message };
  });

  // Delete One todo
  const deleteTodo = handleRequest(async (id) => {
    const response = await axiosInstance.delete(API_PATH.TODO.DELETE_TODO(id));
    await getAllTodos();
    return { success: true, message: response.message };
  });
  // Update todo
  const updateTodo = handleRequest(async (id, completed) => {
    const response = await axiosInstance.put(API_PATH.TODO.UPDATE_TODO(id), {
      completed,
    });
    await getAllTodos();
    return { success: true, message: response.message };
  });
  return {
    getAllTodos,
    updateTodo,
    deleteTodo,
    addTodo,
  };
};

export default useTodoManager;
