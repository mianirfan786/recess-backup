import golf from "../../../images/golf.png";
import { Box, Container, Stack, Typography } from "@mui/material";
import DetailsNavigation from "./DetailsNavigation";
import FeaturesCard from "./FeaturesCard";
import AddressCard from "./AddressCard";
import LocationCard from "./LocationCard";

const _event = {
  id: 1,
  title: "Ultimate Golf",
  location: "Central City Park",
  coordinates: { lat: 32.158915943, lng: 536.1564159 },
  participant: 21,
  date: "",
  time: "",
  image: golf,
  description:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
};

const Details = ({ event = _event }) => {
  const {
    title,
    location,
    participant,
    date,
    time,
    image,
    description,
    coordinates,
  } = event;

  return (
    <Box>
      <Box
        width="100%"
        boxSizing="border-box"
        position="relative"
        sx={{
          aspectRatio: { xs: "5/3", sm: "16/3" },
          background: `url('${golf}') center center/cover`,
        }}
        p={2}
      >
        <DetailsNavigation />
        <Box
          px={2}
          width="100%"
          bottom={0}
          left={0}
          sx={{ transform: "translateY(50%)" }}
          position="absolute"
        >
          <FeaturesCard cost="Free" keyword="Golf" participant={participant} />
        </Box>
      </Box>
      <Container sx={{ py: { xs: 2, md: 4 } }}>
        <Stack mt={4} gap={2}>
          <Stack gap={1}>
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
            <Stack flexDirection="row">
              <Typography variant="body1">dsa</Typography>
              <Typography variant="body1">dsa</Typography>
              <Typography variant="body1">dsa</Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <LocationCard coordinates={coordinates} />
            <AddressCard address={location} />
          </Stack>
          <Typography variant="body1">{description}</Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Details;
