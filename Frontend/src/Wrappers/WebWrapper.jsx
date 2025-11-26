import React, { useEffect, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Outlet } from "react-router-dom";
const WebWrapper = () => {
  useEffect(() => console.log("WebWrapper"));
  return (
    <TodoContext.Provider value={{}}>
      <Outlet />
    </TodoContext.Provider>
  );
};

export default WebWrapper;
