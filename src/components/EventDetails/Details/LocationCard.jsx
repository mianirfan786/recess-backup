import { Box, Stack, Typography } from "@mui/material";
import MapIcon from "../../../icons/MapIcon";

const LocationCard = ({ coordinates }) => {
  const { lat, lng } = coordinates;

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
        <MapIcon />
      </Box>
      <Stack alignItems="center" flexDirection="row" gap={2}>
        <Stack gap={1}>
          <Typography variant="body2" color="#9A9EA0">
            Latitude
          </Typography>
          <Typography variant="body1">{lat.toFixed(2)}</Typography>
        </Stack>
        <span>-</span>
        <Stack gap={1}>
          <Typography variant="body2" color="#9A9EA0">
            Longitude
          </Typography>
          <Typography variant="body1">{lng.toFixed(2)}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LocationCard;
