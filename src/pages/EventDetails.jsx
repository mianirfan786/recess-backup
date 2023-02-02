import { Box, Button, Container, Stack, Typography } from "@mui/material";
import golf from "../images/golf.png";
import DetailsNavigation from "../components/EventDetails/Details/DetailsNavigation";
import FeaturesCard from "../components/EventDetails/Details/FeaturesCard";
import LocationCard from "../components/EventDetails/Details/LocationCard";
import AddressCard from "../components/EventDetails/Details/AddressCard";
import Registered from "../components/EventDetails/Registered/Registered";
import MapView from "../components/Explore/MapView/MapView";
import marker3 from "../images/marker-3.png";
import menFace from "../images/men-face.jpg";
import MessageBoard from "../components/MessageBoard/MessageBoard";

const markers = [
  {
    lat: 24.37,
    lng: 90.0,
    icon: marker3,
    label: "Marker 3",
  },
];

const center = {
  lat: 24.37,
  lng: 90.0,
};

const _event = {
  id: 1,
  title: "Ultimate Golf",
  location: "Central City Park",
  coordinates: { lat: 32.158915943, lng: 536.1564159 },
  participant: 21,
  date: new Date(),
  time: "",
  image: golf,
  description:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
};

const users = [...new Array(7)].map((_, index) => ({
  image: menFace,
  id: index,
  name: "Leslie",
  surname: "Alexander",
  host: index === 0,
}));

const EventDetails = ({ event = _event }) => {
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
    <Box sx={{ backgroundColor: "#FFFF" }}>
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
            <Typography variant="h3" fontWeight="bold">
              {title}
            </Typography>
            <Stack gap={1} divider={<span>•</span>} flexDirection="row">
              <Typography color="primary" variant="body2">
                {location}
              </Typography>
              <Typography variant="body2">{`${date.toLocaleString("en-US", {
                weekday: "long",
              })}, ${date.getMonth()} ${date.getDay()}`}</Typography>
              <Typography variant="body2">10:00 PM - 12:30 PM</Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <LocationCard coordinates={coordinates} />
            <AddressCard address={location} />
          </Stack>
          <Typography variant="body1">{description}</Typography>
          <Registered users={users} />
        </Stack>
      </Container>
      <Stack mb={2} gap={1} maxHeight="600px">
        <Container sx={{ py: { xs: 2, md: 4 } }}>
          <Typography variant="h4" fontWeight="bold">
            Map
          </Typography>
        </Container>
        <Box borderRadius={3} overflow="hidden">
          <MapView height="400px" markers={markers} center={center} />
        </Box>
      </Stack>
      <Stack gap={1}>
        <Container sx={{ py: { xs: 2, md: 4 } }}>
          <Typography variant="h4" fontWeight="bold">
            Message Board
          </Typography>
        </Container>
        <Box borderRadius="20px" overflow="hidden">
          <MessageBoard />
        </Box>
      </Stack>
      <Container sx={{ py: { xs: 2, md: 4 } }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#000",
            color: "info.main",
            borderRadius: 8,
            padding: 2,
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          Join - Free
        </Button>
      </Container>
    </Box>
  );
};

export default EventDetails;
