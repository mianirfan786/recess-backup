import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
  return (
    <div>
      <Box sx={{ minHeight: "100vh" }} className="gradient">
        <Navbar />
        <Outlet />
      </Box>
    </div>
  );
};

export default Main;
