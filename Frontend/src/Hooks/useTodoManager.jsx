import React, { useContext } from "react";
import toast from "react-hot-toast";
import { API_PATH } from "../Utils/apiPath";
import axiosInstance from "../Utils/axiosInstance";
import { TodoContext } from "../Context/TodoContext";

const useTodoManager = () => {
  const { setTodoList } = useContext(TodoContext);

  // Add one todo
  const addTodo = async (todoName, date) => {
    if (!todoName.trim() || !date) {
      return { success: false, error: "Name and date are required." };
    }
    try {
      const response = await axiosInstance.post(API_PATH.TODO.ADD_TODO, {
        todoName,
        date,
      });
      if (response.success) {
        getAllTodos();
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Get All Todos
  const getAllTodos = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.TODO.GET_ALL_TODO);
      if (response.success && Array.isArray(response.todos)) {
        setTodoList(response.todos);
        return;
      }
      setTodoList([]);
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Delete One todo
  const deleteTodo = async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATH.TODO.DELETE_TODO(id)
      );
      if (response.success) {
        getAllTodos();

        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Update todo
  const updateTodo = async (id, completed) => {
    try {
      const response = await axiosInstance.put(API_PATH.TODO.UPDATE_TODO(id), {
        completed,
      });
      getAllTodos();
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    getAllTodos,
    updateTodo,
    deleteTodo,
    addTodo,
  };
};

export default useTodoManager;
