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
      toast.error("All fields is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATH.TODO.ADD_TODO, {
        todoName,
        date,
      });
      toast.success("Todo added successfully");
      getAllTodos();
    } catch (error) {
      console.error(
        "Error adding todo",
        error.response?.data?.message || error.message
      );
    }
  };

  // Get All Todos
  const getAllTodos = async () => {
    try {
      const allTodos = await axiosInstance.get(API_PATH.TODO.GET_ALL_TODO);
      if (allTodos?.data?.todos) {
        setTodoList(allTodos.data.todos);
        return;
      }
      setTodoList([]);
    } catch (error) {
      console.error("Something went wrong. Please try again");
    } 
  };

  // Delete One todo
  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.TODO.DELETE_TODO(id));
      toast.success("Todo deleted successfully");
      getAllTodos();
    } catch (error) {
      console.error(
        "Error deleting tod",
        err.response?.data?.message || err.message
      );
    }
  };

  // Update todo
  const updateTodo = async (id, completed) => {

    try {
      await axiosInstance.put(API_PATH.TODO.UPDATE_TODO(id), {
        completed,
      });
      getAllTodos();
    } catch (error) {
      console.error(
        "Error updating todo: ",
        error.response?.data?.message || error.message
      );
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
