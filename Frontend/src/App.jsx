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
          // Default Styles
          style: {
            background: "#ffffff",
            color: "#3f3f46",
            padding: "16px",
            borderRadius: "16px",
            fontSize: "14px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e4e4e7",
            maxWidth: "350px",
          },
          // Success Styles
          success: {
            iconTheme: {
              primary: "#7c3aed",
              secondary: "#ffffff",
            },
            style: {
              borderLeft: "4px solid #7c3aed",
            },
          },
          // Error Styles
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
            style: {
              borderLeft: "4px solid #ef4444",
            },
          },
        }}
      />
    </>
  );
};

export default App;
