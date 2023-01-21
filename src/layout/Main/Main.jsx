import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";

const Main = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const excludedRoute = !["/login", "/sign-up", "/forget-password"].includes(
    pathname
  );
  return (
    <div>
      <Box sx={{ minHeight: "100vh" }} className="gradient">
        {matches && excludedRoute && <Navbar />}
        <Outlet />
        {!matches && excludedRoute && <MobileNavbar />}
      </Box>
    </div>
  );
};

export default Main;
