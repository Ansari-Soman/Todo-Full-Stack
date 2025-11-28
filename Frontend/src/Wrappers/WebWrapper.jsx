import React, { useEffect, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Outlet } from "react-router-dom";
import Loading from "../Components/common/Loading";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
const WebWrapper = () => {
  const [todoList, setTodoList] = useState([]);
  const [summary, setSummary] = useState({
    total: "",
    remaining: "",
    completed: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.TODO.GET_ALL_TODO);
        if (response?.data?.todos) {
          setTodoList(response?.data?.todos);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  useEffect(() => {
    setSummary({
      total: todoList.length,
      remaining: todoList.filter((todo) => todo.completed === false).length,
      completed: todoList.filter((todo) => todo.completed === true).length,
    });
  }, [todoList]);

  if (loading) return <Loading />;
  return (
    <TodoContext.Provider
      value={{ todoList, setTodoList, summary, loading, setLoading }}
    >
      <Outlet />
    </TodoContext.Provider>
  );
};

export default WebWrapper;
