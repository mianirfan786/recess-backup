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
import EventConfirmationModal from "../modals/EventConfirmationModal";
import { useModalsContext } from "../modals/ModalsContext";
import { MODALS } from "../modals/modals";
import getDate from "../utils/getDate";
import FlagEventModal from "../modals/FlagEventModal";

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

  const { openModal, setOpenModal } = useModalsContext();

  return (
    <>
      <EventConfirmationModal
        open={openModal === MODALS.EVENT_CONFIRMATION}
        event={event}
        onClose={() => setOpenModal(null)}
      />
      <FlagEventModal
        open={openModal === MODALS.EVENT_FLAG}
        onClose={() => setOpenModal(null)}
      />
      <Box mt={{ xs: 0, sm: 2 }} sx={{ backgroundColor: "#FFFF" }}>
        <Box
          width="100%"
          boxSizing="border-box"
          position="relative"
          sx={{
            aspectRatio: { xs: "5/3", sm: "15/3.5" },
            background: `url('${golf}') center center/cover`,
          }}
          p={2}
        >
          <DetailsNavigation />
          <Box
            px={2}
            width="100%"
            maxWidth="650px"
            bottom={0}
            left="50%"
            sx={{ transform: "translateY(50%) translateX(-50%)" }}
            position="absolute"
          >
            <FeaturesCard
              cost="Free"
              keyword="Golf"
              participant={participant}
            />
          </Box>
        </Box>
        <Container sx={{ py: { xs: 2, md: 4 } }}>
          <Stack spacing={3}>
            <Stack mt={4} gap={2}>
              <Stack gap={1}>
                <Typography variant="h3" fontWeight="bold">
                  {title}
                </Typography>
                <Stack gap={1} divider={<span>•</span>} flexDirection="row">
                  <Typography color="primary" variant="body2">
                    {location}
                  </Typography>
                  <Typography variant="body2">{getDate(date)}</Typography>
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
            <Stack mb={2} gap={1}>
              <Typography variant="h4" fontWeight="bold">
                Map
              </Typography>
              <Box borderRadius={3} overflow="hidden">
                <MapView height="500px" markers={markers} center={center} />
              </Box>
            </Stack>
            <Stack gap={1}>
              <Typography variant="h4" fontWeight="bold">
                Message Board
              </Typography>
              <Box borderRadius="20px" overflow="hidden">
                <MessageBoard />
              </Box>
            </Stack>
            <Button
              onClick={() => setOpenModal(MODALS.EVENT_CONFIRMATION)}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#000",
                color: "info.main",
                borderRadius: 8,
                padding: 1,
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
            >
              Join - Free
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default EventDetails;
