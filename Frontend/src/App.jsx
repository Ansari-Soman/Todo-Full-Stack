import React from "react";
import AppRouter from "./Router/AppRouter";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="bg-gray-300 ">
      <AppRouter />
      <Toaster
        toastOption={{
          limit: 1,
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
};

export default App;
