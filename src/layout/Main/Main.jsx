import {Box, useMediaQuery, useTheme} from "@mui/material";
import {Outlet, useLocation} from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import {UserAuthContextProvider} from "../../context/authContext";
import {ROUTES} from "../../routes";

const Main = () => {
    const {pathname} = useLocation();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const excludedRoute = ![
        ROUTES.LOGIN,
        ROUTES.SIGN_UP,
        ROUTES.FORGOT_PASSWORD,
    ].includes(pathname);

    return (
        <UserAuthContextProvider>
            <div>
                <Box
                    sx={{minHeight: "100vh"}}
                    display="flex"
                    flexDirection="column"
                    className="gradient"
                >
                    {matches && excludedRoute && <Navbar/>}
                    <Outlet/>
                    {!matches && excludedRoute && <MobileNavbar/>}
                </Box>
            </div>
        </UserAuthContextProvider>
    );
};

export default Main;
