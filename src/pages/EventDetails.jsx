import {Box, Button, Container, Stack, Typography} from "@mui/material";
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
import {useModalsContext} from "../modals/ModalsContext";
import {MODALS} from "../modals/modals";
import getDate from "../utils/getDate";
import FlagEventModal from "../modals/FlagEventModal";
import {useParams} from "react-router-dom";
import {ViewEventById} from "../firebase/functions/event";
import {useState} from "react";

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
    title: "Loading...",
    location: "Loading...",
    keywords: "Loading...",
    coordinates: {lat: 32.158915943, lng: 536.1564159},
    maxParticipants: "Loading...",
    date: new Date(),
    startTime: "Loading...",
    endTime: "Loading...",
    cost: "Loading...",
    photos: golf,
    description:
        "Loading...",
};

const users = [...new Array(7)].map((_, index) => ({
    image: menFace,
    id: index,
    name: "Leslie",
    surname: "Alexander",
    host: index === 0,
}));

const EventDetails = ({event = _event}) => {
    const {id} = useParams();
    const [title, setTitle] = useState(event.title);
    const [location, setLocation] = useState(event.location);
    const [maxParticipants, setmaxParticipants] = useState(event.maxParticipants);
    const [date, setDate] = useState(event.date);
    const [startTime, setStartTime] = useState(event.startTime);
    const [endTime, setEndTime] = useState(event.endTime);
    const [photos, setPhotos] = useState(event.photos);
    const [keywords, setKeywords] = useState(event.keywords);
    const [cost, setCost] = useState(event.cost);
    const [description, setDescription] = useState(event.description);
    const [coordinates, setCoordinates] = useState(event.coordinates);

    const FetchedEvent = ViewEventById(id).then((event) => {
        setTitle(event.title);
        setmaxParticipants(event.maxParticipants);
        setStartTime(timeTo12HrFormat(event.startTime));
        setEndTime(timeTo12HrFormat(event.endTime));
        setDate(new Date(event.date));
        setPhotos(event.photos);
        setKeywords(event.keywords);
        setCost(event.cost === 0 ? "Free" : event.cost);
        setDescription(event.description);
    });

    function timeTo12HrFormat(time) {
        const timeArr = time.split(':');
        let hours = parseInt(timeArr[0]);
        let minutes = parseInt(timeArr[1]);
        let designation = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const timeStr = hours + ':' + minutes + ' ' + designation;
        return timeStr;

    }

    const {openModal, setOpenModal} = useModalsContext();

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
            <Box mt={{xs: 0, sm: 2}} sx={{backgroundColor: "#FFFF"}}>
                <Box
                    width="100%"
                    boxSizing="border-box"
                    position="relative"
                    sx={{
                        aspectRatio: {xs: "5/3", sm: "15/3.5"},
                        background: `url('${photos[0]}') center center/cover`,
                    }}
                    p={2}
                >
                    <DetailsNavigation/>
                    <Box
                        px={2}
                        width="100%"
                        maxWidth="650px"
                        bottom={0}
                        left="50%"
                        sx={{transform: "translateY(50%) translateX(-50%)"}}
                        position="absolute"
                    >
                        <FeaturesCard
                            cost={cost}
                            keyword={keywords}
                            participant={maxParticipants}
                        />
                    </Box>
                </Box>
                <Container sx={{py: {xs: 2, md: 4}}}>
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
                                    <Typography variant="body2">{startTime} - {endTime}</Typography>
                                </Stack>
                            </Stack>
                            <Stack gap={1}>
                                <LocationCard coordinates={coordinates}/>
                                <AddressCard address={location}/>
                            </Stack>
                            <Typography variant="body1">{description}</Typography>
                            <Registered users={users}/>
                        </Stack>
                        <Stack mb={2} gap={1}>
                            <Typography variant="h4" fontWeight="bold">
                                Map
                            </Typography>
                            <Box borderRadius={3} overflow="hidden">
                                <MapView height="500px" markers={markers} center={center}/>
                            </Box>
                        </Stack>
                        <Stack gap={1}>
                            <Typography variant="h4" fontWeight="bold">
                                Message Board
                            </Typography>
                            <Box borderRadius="20px" overflow="hidden">
                                <MessageBoard/>
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
                            Join - {cost}
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default EventDetails;
