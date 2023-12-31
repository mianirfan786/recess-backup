export const ROUTES = {
    HOME: "/home",
    EXPLORE: "/explore",
    NOTIFICATIONS: "/notifications",
    PROFILE: "/profile",
    LOGIN: "/login",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    FORGOT_ACCOUNT_PASSWORD: "/forgot-account-password",
    EVENT_DETAILS: "/event/:id",
    EVENTS_PAGE: "/events",
    RESET_PASSWORD: "/reset-password",
    RESET_ACCOUNT_PASSWORD: "/reset-account-password",
    DELETE_ACCOUNT: "/delete-account",
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_OF_SERVICES: "/terms-of-services",
    PAYMENTS: "/payments",
    SET_UP_PAYMENT: "/set-up-payment",
    PAY_WITH: "/pay-with",
    ADD_CARD_DETAILS: "/add-card-details",
    TRANSACTIONS: "/transactions",
    PAYMENT_DETAILS: "/payment-details",
    NOTIFICATIONS_SETTINGS: "/notifications-settings",
    CREATE_EVENT: "/create-event",
    PAYMENT_WITHDRAW: "/payment-withdraw",
};

export const isRouteProtected = (route) => {
    return (
        route !== ROUTES.LOGIN &&
        route !== ROUTES.SIGN_UP &&
        route !== ROUTES.FORGOT_PASSWORD &&
        route !== ROUTES.RESET_PASSWORD
    );
};
