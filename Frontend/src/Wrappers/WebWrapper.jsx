import React, { useEffect, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Outlet } from "react-router-dom";
import Loading from "../Components/common/Loading";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import { useAuth } from "../Context/AuthContext";
import useAuthFlowHandler from "../Hooks/useAuthFlowHandler";
const WebWrapper = () => {
  const { user, isAuthenticated } = useAuth();
  const [todoList, setTodoList] = useState([]);
  const [summary, setSummary] = useState({
    total: "",
    remaining: "",
    completed: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!(user && isAuthenticated)) {
      setLoading(false);
      return;
    }
    const getTodos = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATH.TODO.GET_ALL_TODO);
        if (response?.todos) {
          setTodoList(response.todos);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, [user, isAuthenticated]);

  useEffect(() => {
    setSummary({
      total: todoList.length,
      remaining: todoList.filter((todo) => todo.completed === false).length,
      completed: todoList.filter((todo) => todo.completed === true).length,
    });
  }, [todoList]);
  useAuthFlowHandler();

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
