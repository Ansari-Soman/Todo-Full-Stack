import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import WebWrapper from "../Wrappers/WebWrapper";
import Header from "../Components/common/Header";
import Main from "../Pages/Todo/Main";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import VerifyOTP from "../Pages/Auth/VerifyOTP";
import ResetPassword from "../Pages/Auth/ResetPassword";
import SetPassword from "../Pages/Auth/SetPassword";
import EmailSent from "../Pages/Auth/EmailSent";
import SetPasswordProtectedRoute from "../Components/Protected Wrapper/SetPasswordProtectedRoute";
import ResetPasswordProtectedRoute from "../Components/Protected Wrapper/ResetPasswordProtectedRoute";
import OTPProtectedRoute from "../Components/Protected Wrapper/OTPProtectedRoute";
import NotFound from "../Components/common/NotFound";
import NonPrivateWrapper from "../Wrappers/NonPrivateWrapper";
import PrivateWrapper from "../Wrappers/PrivateWrapper";
import EmailSendProtected from "../Components/Protected Wrapper/EmailSendProtected";
import ForgotPasswordEmail from "../Pages/Auth/ForgotPasswordEmail";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <WebWrapper />,
      children: [
        {
          element: <NonPrivateWrapper />,
          children: [
            {
              path: "/signup",
              element: <SignUp />,
            },
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/verify",
              element: (
                <OTPProtectedRoute>
                  <VerifyOTP />
                </OTPProtectedRoute>
              ),
            },
            {
              path: "/email-send",
              element: (
                <EmailSendProtected>
                  <EmailSent />
                </EmailSendProtected>
              ),
            },
            {
              path: "/set-password",
              element: (
                <SetPasswordProtectedRoute>
                  <SetPassword />
                </SetPasswordProtectedRoute>
              ),
            },

            {
              path: "/reset-password",
              element: (
                <ResetPasswordProtectedRoute>
                  <ResetPassword />
                </ResetPasswordProtectedRoute>
              ),
            },
            {
              path: "/forgot-password",
              element: <ForgotPasswordEmail />,
            },
          ],
        },
        {
          element: <PrivateWrapper />,
          children: [
            {
              path: "/dashboard",
              element: (
                <>
                  <Header />
                  <Main />
                </>
              ),
            },
          ],
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
