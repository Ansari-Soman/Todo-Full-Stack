import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import WebWrapper from "../Wrappers/WebWrapper";
import SummaryBar from "../Components/SummaryBar";
import Header from "../Components/Header";
import Input from "../Components/Input";
import TaskList from "../Components/TaskList";
import axiosInstance from "../Utils/axiosInstance";
import toast from "react-hot-toast";
import { API_PATH } from "../Utils/apiPath";
import Main from "../Pages/Todo/Main";

const AppRouter = () => {


  const router = createBrowserRouter([
    {
      element: <WebWrapper />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
