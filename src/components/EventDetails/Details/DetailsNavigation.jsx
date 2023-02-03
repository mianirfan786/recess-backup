import { Box, IconButton } from "@mui/material";
import BackButton from "../../../icons/BackIcon";
import ShareIcon from "../../../icons/ShareIcon";
import InfoIcon from "../../../icons/InfoIcon";

const iconStyle = {
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: "1/1",
  width: { xs: "30px", sm: "40px" },
  height: { xs: "30px", sm: "40px" },
  opacity: 0.8,
  padding: "7px",
};

const DetailsNavigation = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <IconButton size="small" sx={iconStyle}>
        <BackButton />
      </IconButton>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton size="small" sx={iconStyle}>
          <ShareIcon />
        </IconButton>
        <IconButton size="small" sx={iconStyle}>
          <InfoIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DetailsNavigation;
