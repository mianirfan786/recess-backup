import { useNavigate } from "react-router-dom";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import BackButton from "../icons/BackIcon";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Stack position="relative" flexDirection="row">
      <Box sx={{ transform: "translateY(-50%)" }} top="50%" position="absolute">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ width: "40px", height: "40px" }}
        >
          <BackButton />
        </IconButton>
      </Box>
      <Typography
        width="100%"
        ml={{ xs: 0, sm: 8 }}
        textAlign={{ xs: "center", sm: "initial" }}
        variant="h3"
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default PageHeader;
