import { Box, Stack, Typography } from "@mui/material";
import LocationIcon from "../../../icons/LocationIcon";

const AddressCard = ({ address }) => {
  return (
    <Box
      borderRadius={4}
      sx={{ backgroundColor: "#ECF5F2" }}
      width="100%"
      display="flex"
      gap={2}
      alignItems="center"
      p={1}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={2}
        p={1}
        sx={{ backgroundColor: "#FFF" }}
      >
        <LocationIcon />
      </Box>
      <Stack gap={1}>
        <Typography variant="body2" color="#9A9EA0">
          Address
        </Typography>
        <Typography variant="body1">{address}</Typography>
      </Stack>
    </Box>
  );
};

export default AddressCard;
