import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import WebWrapper from "../Wrappers/WebWrapper";
import Header from "../Components/common/Header";
import Main from "../Pages/Todo/Main";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import ProtectedRoute from "../Components/common/ProtectedRoute";
import VerifyOTP from "../Components/common/VerifyOTP";
import ResetPassword from "../Components/common/ResetPassword";
import SetPassword from "../Components/common/SetPassword";
import EmailSent from "../Components/common/EmailSent";
import SetPasswordProtectedRoute from "../Components/common/SetPasswordProtectedRoute";
import ResetPasswordProtectedRoute from "../Components/common/ResetPasswordProtectedRoute";
import OTPProtectedRoute from "../Components/common/OTPProtectedRoute";
import ForgotPassword from "../Components/common/ForgotPassword";
import NotFound from "../Components/common/NotFound";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <WebWrapper />,
      children: [
        {
          path: "/",
          element: (
            <>
              <ProtectedRoute>
                <Header />
                <Main />
              </ProtectedRoute>
            </>
          ),
        },
        {
          path: "/login",
          element: (
            <>
              <Login />
            </>
          ),
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/verify",
          element: (
            <>
              <OTPProtectedRoute>
                <VerifyOTP />
              </OTPProtectedRoute>
            </>
          ),
        },
        {
          path: "/set-password",

          element: (
            <>
              <SetPasswordProtectedRoute>
                <SetPassword />
              </SetPasswordProtectedRoute>
            </>
          ),
        },
        {
          path: "/email-send",
          element: <EmailSent />,
        },
        {
          path: "/reset-password",
          element: (
            <>
              <ResetPassword />
              {/* <ResetPasswordProtectedRoute>
              </ResetPasswordProtectedRoute> */}
            </>
          ),
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
