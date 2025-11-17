import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import WebWrapper from "../Wrappers/WebWrapper";
import Header from "../Components/common/Header";
import Main from "../Pages/Todo/Main";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <WebWrapper />,
      children: [
        {
          path: "/",
          element: (
            <>
              <Header />
              <Main />
            </>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
