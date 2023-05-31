import {createBrowserRouter, Navigate} from "react-router-dom";
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
import {ROUTES} from "./index";
import NotificationsSettings from "../pages/NotificationsSettings";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfServices from "../pages/TermsOfServices";
import Payments from "../pages/Payments";
import PaymentDetails from "../pages/PaymentDetails";
import Transactions from "../pages/Transactions";
import SetUpPaymentMethod from "../pages/SetUpPaymentMethod";
import PayWith from "../pages/PayWith";
import AddCardDetails from "../pages/AddCardDetails";
import CreateEvent from "../pages/CreateEvent";
import ResetPassword from "../pages/ResetPassword";
import Events from "../pages/Events";
import PaymentWithdraw from "../pages/PaymentWithdraw";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage/>,

        children: [
            {
                path: "/",
                element: <Navigate to={ROUTES.LOGIN}/>,
            },
            {
                path: ROUTES.HOME,
                element: <Home/>,
            },
            {
                path: ROUTES.EXPLORE,
                element: <Explore/>,
            },
            {
                path: ROUTES.NOTIFICATIONS,
                element: <Notifications/>,
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile/>,
            },
            {
                path: ROUTES.PAYMENT_WITHDRAW,
                element: <PaymentWithdraw/>,
            },
            {
                path: ROUTES.LOGIN,
                element: <Login/>,
            },
            {
                path: ROUTES.SIGN_UP,
                element: <SignUp/>,
            },
            {
                path: ROUTES.FORGOT_PASSWORD,
                element: <ForgotPassword/>,
            },
            {
                path: ROUTES.FORGOT_ACCOUNT_PASSWORD,
                element: <ForgotPassword/>,
            },
            {
                path: ROUTES.EVENT_DETAILS,
                element: <EventDetails/>,
            },
            {
                path: ROUTES.EVENTS_PAGE,
                element: <Events/>,
            },
            {
                path: ROUTES.NOTIFICATIONS_SETTINGS,
                element: <NotificationsSettings/>,
            },
            {
                path: ROUTES.PRIVACY_POLICY,
                element: <PrivacyPolicy/>,
            },
            {
                path: ROUTES.TERMS_OF_SERVICES,
                element: <TermsOfServices/>,
            },
            {path: ROUTES.PAYMENTS, element: <Payments/>},
            {path: ROUTES.TRANSACTIONS, element: <Transactions/>},
            {path: ROUTES.PAYMENT_DETAILS, element: <PaymentDetails/>},
            {path: ROUTES.SET_UP_PAYMENT, element: <SetUpPaymentMethod/>},
            {path: ROUTES.PAY_WITH, element: <PayWith/>},
            {path: ROUTES.ADD_CARD_DETAILS, element: <AddCardDetails/>},
            {path: ROUTES.CREATE_EVENT, element: <CreateEvent/>},
            {path: ROUTES.RESET_PASSWORD, element: <ResetPassword/>},
            {path: ROUTES.RESET_ACCOUNT_PASSWORD, element: <ResetPassword/>},
        ],
    },
]);

export default routes;
