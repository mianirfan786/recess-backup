import {Box, Button, Container, Stack, Typography} from "@mui/material";
import "swiper/css";
import {Swiper, SwiperSlide} from "swiper/react";
import RecentlyAddedCard from "./RecentlyAddedCard";
import {useEffect, useState} from "react";
import {
    SortEventWithCityByTimeStamp,
    SortEventWithLocationByTimeStamp
} from "../../../firebase/functions/event/sort-event";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../routes";


const RecentlyAdded = ({currentCity}) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        if (currentCity.trim() !== "") {
            SortEventWithCityByTimeStamp(currentCity, 4).then((events) => {
                if (isMounted) {
                    setEvents(events);
                }
            });
        } else {
            SortEventWithLocationByTimeStamp(4, -1, -1).then((events) => {
                if (isMounted) {
                    setEvents(events);
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [currentCity]);

    return (
        <Box sx={{bgcolor: "#F6FBF9"}}>
            <Container sx={{py: {xs: 2, md: 4}}}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            Recently Added
                        </Typography>
                        <Typography variant="body1" sx={{fontSize: {xs: 14, md: 16}}}>
                            The most recently added activities in your area.
                        </Typography>
                    </Box>
                    <Box sx={{transform: "rotate(-90deg)"}}>
                        <Button
                            onClick={function (e) {
                                e.preventDefault();
                                navigate(ROUTES.EVENTS_PAGE + "?type=recently-added-event");
                            }}
                            sx={{color: "text.primary"}} variant="text">
                            See all
                        </Button>
                    </Box>
                </Stack>
            </Container>
            <Container
                sx={{
                    py: {xs: 2, md: 4},
                    pr: {xs: 0, md: "inherit"},
                    pl: {xs: 2, md: "inherit"},
                }}
            >
                <Swiper
                    slidesPerView={1.4}
                    spaceBetween={2}
                    breakpoints={{
                        600: {
                            slidesPerView: 2.1,
                            spaceBetween: 2,
                        },
                        768: {
                            slidesPerView: 2.7,
                            spaceBetween: 2,
                        },
                        1024: {
                            slidesPerView: 3.2,
                            spaceBetween: 2,
                        },
                    }}
                    grabCursor={true}
                    className="mySwiper"
                >
                    {events.map((event) => (
                        <SwiperSlide key={event.id}>
                            <RecentlyAddedCard event={event}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    );
};

export default RecentlyAdded;
