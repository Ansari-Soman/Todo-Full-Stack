import React, { useEffect, useState } from "react";
import SummaryBar from "../../Components/SummaryBar";
import Input from "../../Components/Input";
import TaskList from "../../Components/TaskList";
import toast from "react-hot-toast";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPath";

const Main = () => {
  const [todoList, setTodoList] = useState([]);
  const [summary, setSummary] = useState({
    total: "",
    remaining: "",
    completed: "",
  });
  let total = 0;
  let remaining = 0;
  let completed = 0;

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
      handleSummary();
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
      setTodoList(allTodos.data);
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
      handleSummary();
    } catch (error) {
      console.error(
        "Error deleting tod",
        err.response?.data?.message || err.message
      );
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      await axiosInstance.put(API_PATH.TODO.UPDATE_TODO(id), {
        completed,
      });
      getAllTodos();
      handleSummary();
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

  const handleSummary = () => {
    setSummary({
      total: todoList.length,
      remaining: todoList.filter((todo) => todo.completed === false).length,
      completed: todoList.filter((todo) => todo.completed === true).length,
    });
  };
  // useEffect(() => {
  //   handleSummary();
  // }, [todoList]);
  return (
    <div>
      <SummaryBar summary={summary} />
      <Input addTodo={addTodo} />
      
      <TaskList
        getAllTodos={getAllTodos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        todoList={todoList}
      />
    </div>
  );
};

export default Main;
