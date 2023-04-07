import {Box, Button, Container, Stack, Typography} from "@mui/material";
import golf from "../images/golf.png";
import DetailsNavigation from "../components/EventDetails/Details/DetailsNavigation";
import FeaturesCard from "../components/EventDetails/Details/FeaturesCard";
import LocationCard from "../components/EventDetails/Details/LocationCard";
import AddressCard from "../components/EventDetails/Details/AddressCard";
import Registered from "../components/EventDetails/Registered/Registered";
import MapView from "../components/Explore/MapView/MapView";
import marker3 from "../images/marker-3.png";
import MessageBoard from "../components/MessageBoard/MessageBoard";
import EventConfirmationModal from "../modals/EventConfirmationModal";
import {useModalsContext} from "../modals/ModalsContext";
import {MODALS} from "../modals/modals";
import FlagEventModal from "../modals/FlagEventModal";
import {useParams} from "react-router-dom";
import {checkIfEventIsFlaggedByCurrentUser, ViewEventById} from "../firebase/functions/event";
import {useEffect, useState} from "react";
import {GetUsersByIds} from "../firebase/functions/user";
import {HasUserJoinedEvent} from "../firebase/functions/event/event-join";
import {timeTo12HrFormat} from "../utils/timeFunctions";
import {toast} from "react-toastify";

const _event = {
    id: 1,
    title: "Loading...",
    location: "Loading...",
    keywords: "Loading...",
    coordinates: {lat: 32.158915943, lng: 536.1564159},
    address: {latitude: 10.00, longitude: 10.00},
    maxParticipants: "Loading...",
    date: new Date(),
    startTime: "Loading...",
    endTime: "Loading...",
    cost: "Loading...",
    photos: golf,
    description:
        "Loading...",
};

const EventDetails = ({event = _event, markers}) => {
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
    const [address, setAddress] = useState(event.address);
    const [users, setUsers] = useState([]);
    const [IsUserJoined, setIsUserJoined] = useState(false);
    const [displayAddress, setDisplayAddress] = useState(event.address.displayAddress ? event.address.displayAddress : "");
    const [creator, setCreator] = useState(event.CreatedBy);
    const [eventFlagged, setEventFlagged] = useState(false);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);



    useEffect(() => {
        checkIfEventIsFlaggedByCurrentUser(id).then(r =>{
            setEventFlagged(r)
        })
        ViewEventById(id).then((data) => {
            setTitle(data.title);
            setmaxParticipants(data.maxParticipants);
            setStartTime(timeTo12HrFormat(data.startTime));
            setEndTime(timeTo12HrFormat(data.endTime));
            setDate((data.date).toDate());
            setPhotos(data.photos);
            setKeywords(data.keywords);
            setCost(event.cost === 0 ? "Free" : data.cost);
            setDescription(data.description);
            setAddress(data.address);
            setCreator(data.CreatedBy)
            setLocation(data.address.city + ", " + data.address.principalSubdivision + ", " + data.address.countryCode)
            setDisplayAddress(data.address.displayAddress ? data.address.displayAddress : event.displayAddress);
            /* change event.date */
            GetUsersByIds(data.joined).then((usersData) => {
                /* check array for null */
                const crrData = usersData.filter((user) => user !== null);
                setUsers(crrData);
            });
        });
        HasUserJoinedEvent(id).then((data) => {
            setIsUserJoined(data);
        })
    }, []);


    const {openModal, setOpenModal} = useModalsContext();

    return (
        <>
            <EventConfirmationModal
                open={openModal === MODALS.EVENT_CONFIRMATION}
                id={id}
                title={title}
                maxParticipants={maxParticipants}
                date={date}
                startTime={startTime}
                endTime={endTime}
                photos={photos}
                keywords={keywords}
                cost={cost}
                displayAddress={displayAddress}
                address={address}
                description={description}
                event={event}
                creator={creator}
                onClose={() => setOpenModal(null)}
            />
            <FlagEventModal
                id={id}
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
                    <DetailsNavigation event={event} eventFlagged={eventFlagged} />
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
                            cost={cost === 0 ? "Free" : cost}
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
                                    {eventFlagged && (
                                            <Typography style={{
                                                background: "red",
                                                color: "white",
                                                padding: ".5rem 1rem",
                                                borderRadius: "20px",
                                                width: "fit-content",
                                                marginRight: "1rem",
                                                display: "inline-block",
                                            }}>
                                                Flagged By You
                                            </Typography>
                                        )}
                                        {title}
                                </Typography>
                                <Stack gap={1} divider={<span>•</span>} flexDirection="row">
                                    <Typography color="primary" variant="body2">
                                        {address.city}, {address.principalSubdivision}, {address.countryCode}
                                    </Typography>
                                    <Typography variant="body2">

                                        {date.toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </Typography>
                                    <Typography variant="body2">{startTime} - {endTime}</Typography>
                                </Stack>
                            </Stack>
                            <Stack gap={1}>
                                <LocationCard coordinates={address}/>
                                <AddressCard address={displayAddress}/>
                            </Stack>
                            <Typography variant="body1">{description}</Typography>
                            <Registered users={users} maxParticipants={maxParticipants}/>
                        </Stack>
                        <Stack mb={2} gap={1}>
                            <Typography variant="h4" fontWeight="bold">
                                Map
                            </Typography>
                            <Box borderRadius={3} overflow="hidden">
                                <MapView height="500px" markers={address} center={address}/>
                            </Box>
                        </Stack>
                        <Stack gap={1}>
                            <Typography variant="h4" fontWeight="bold">
                                Message Board
                            </Typography>
                            <Box borderRadius="20px" overflow="hidden">
                                <MessageBoard id={id}/>
                            </Box>
                        </Stack>
                        <Button
                            onClick={() => {
                                if (date < new Date()) {
                                    toast("Event has already passed", {type: "error"})
                                } else {
                                    setOpenModal(MODALS.EVENT_CONFIRMATION)
                                }
                            }}
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
                            {
                                IsUserJoined ? "Already Joined" : `Join - ${cost === 0 ? "Free" : cost}`
                            }

                        </Button>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default EventDetails;
