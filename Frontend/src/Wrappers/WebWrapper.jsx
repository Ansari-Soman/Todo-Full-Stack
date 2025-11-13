import React from "react";
import { TodoContext } from "../Context/TodoContext";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
const WebWrapper = () => {
  return (
    <TodoContext.Provider value={{}}>
      <Header />
      <Outlet />
    </TodoContext.Provider>
  );
};

export default WebWrapper;
