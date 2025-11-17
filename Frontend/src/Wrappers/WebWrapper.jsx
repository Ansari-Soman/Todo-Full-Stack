import React, { useEffect, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Outlet } from "react-router-dom";
const WebWrapper = () => {
  const [user, setUser] = useState(null);
  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  // Check if user exists
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <TodoContext.Provider value={{ user, updateUser, clearUser }}>
      <Outlet />
    </TodoContext.Provider>
  );
};

export default WebWrapper;
