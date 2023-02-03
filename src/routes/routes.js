import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layout/Main/Main";
import ErrorPage from "../pages/ErrorPage";
import Explore from "../pages/Explore";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import EventDetails from "../pages/EventDetails";

export const ROUTES = {
  HOME: "/home",
  EXPLORE: "/explore",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  EVENT_DETAILS: "/event/:id",
  RESET_PASSWORD: "/reset-password",
  DELETE_ACCOUNT: "/delete-account",
  PRIVACY_POLICY: "/privacy-policy",
  PAYMENTS: "/payments",
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Navigate to={ROUTES.LOGIN} />,
      },
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.EXPLORE,
        element: <Explore />,
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: <Notifications />,
      },
      {
        path: ROUTES.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: ROUTES.EVENT_DETAILS,
        element: <EventDetails />,
      },
    ],
  },
]);

export default routes;
