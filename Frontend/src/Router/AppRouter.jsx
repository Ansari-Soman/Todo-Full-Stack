import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import WebWrapper from "../Wrappers/WebWrapper";
import SummaryBar from "../Components/SummaryBar";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <WebWrapper />,
      children: [
        {
          path: "/",
          element: <SummaryBar total={5} remaining={2} completed={10} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
