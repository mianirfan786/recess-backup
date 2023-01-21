import { Box, Button } from "@mui/material";
import { useState } from "react";
import { BsViewList } from "react-icons/bs";
import { IoMapOutline } from "react-icons/io5";

const ExploreFilter = ({ view, setView, handleView }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          border: "1.5px solid #CED1DC80",
          borderRadius: 8,
        }}
      >
        <Button
          onClick={() => handleView("list")}
          sx={{
            fontSize: 30,
            borderRadius: 8,
            bgcolor: view === "list" ? "text.primary" : "transparent",
            color: view === "list" ? "info.main" : "text.secondary",
            border: "none",
            "&:hover": {
              bgcolor: "text.primary",
              color: "info.main",
              border: "none",
            },
          }}
          variant={view === "list" ? "contained" : "outlined"}
        >
          <BsViewList />
        </Button>
        <Button
          onClick={() => handleView("map")}
          sx={{
            fontSize: 30,
            borderRadius: 8,
            bgcolor: view === "map" ? "text.primary" : "transparent",
            color: view === "map" ? "info.main" : "text.secondary",
            border: "none",
            "&:hover": {
              bgcolor: "text.primary",
              color: "info.main",
              border: "none",
            },
          }}
          variant={view === "map" ? "contained" : "outlined"}
        >
          <IoMapOutline />
        </Button>
      </Box>
    </div>
  );
};

export default ExploreFilter;
