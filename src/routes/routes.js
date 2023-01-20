import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layout/Main/Main";
import ErrorPage from "../pages/ErrorPage";
import Explore from "../pages/Explore";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default routes;
