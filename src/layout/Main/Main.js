import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Box sx={{ minHeight: "100vh" }} className="gradient">
        {pathname !== "/login" &&
          pathname !== "/sign-up" &&
          pathname !== "/forgot-password" && <Navbar />}
        <Outlet />
      </Box>
    </div>
  );
};

export default Main;
