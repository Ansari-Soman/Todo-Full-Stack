import React from "react";
import AppRouter from "./Router/AppRouter";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1f2937",
            padding: "10px 16px",
            borderRadius: "12px",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
            borderLeft: "6px solid #3b82f6", // blue-500
          },
          success: {
            style: {
              borderLeftColor: "#10b981", // green-500
            },
          },
          error: {
            style: {
              borderLeftColor: "#ef4444", // red-500
            },
          },
        }}
      />
    </>
  );
};

export default App;
