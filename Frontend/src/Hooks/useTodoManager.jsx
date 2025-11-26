import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_PATH } from "../Utils/apiPath";
import axiosInstance from "../Utils/axiosInstance";

const useTodoManager = () => {
  const [todoList, setTodoList] = useState([]);
  const [summary, setSummary] = useState({
    total: "",
    remaining: "",
    completed: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSummary({
      total: todoList.length,
      remaining: todoList.filter((todo) => todo.completed === false).length,
      completed: todoList.filter((todo) => todo.completed === true).length,
    });
  }, [todoList]);

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
    setLoading(true);
    try {
      const allTodos = await axiosInstance.get(API_PATH.TODO.GET_ALL_TODO);
      if (allTodos?.data?.todos) {
        return setTodoList(allTodos.data.todos);
      }
      setTodoList([]);
    } catch (error) {
      console.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);
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
        err.response?.data?.message || err.message
      );
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return {
    loading,
    getAllTodos,
    updateTodo,
    deleteTodo,
    addTodo,
    todoList,
    summary,
  };
};

export default useTodoManager;
