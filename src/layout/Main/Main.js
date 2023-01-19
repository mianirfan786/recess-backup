import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Box sx={{ minHeight: "100vh" }} className="gradient">
      <Outlet />
    </Box>
  );
};

export default Main;
