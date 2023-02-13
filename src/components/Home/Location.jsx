import { Container } from "@mui/material";
import GoogleAutocomplete from "../GoogleAutocomplete";
import { Stack } from "@mui/system";
import LocationIcon from "../../icons/LocationIcon";

const Location = () => {
  return (
    <Container>
      <Stack
        height="100%"
        p={1}
        borderRadius="20px"
        flexDirection="row"
        alignItems="center"
        gap={1}
        sx={{ backgroundColor: "white" }}
      >
        <Stack
          p={2}
          height="100%"
          borderRadius="15px"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: "#ECF5F2" }}
        >
          <LocationIcon />
        </Stack>
        <GoogleAutocomplete onChange={() => null} />
      </Stack>
    </Container>
  );
};

export default Location;
