import {Box, Button, Container, Stack, Typography} from "@mui/material";
import "swiper/css";
import {Swiper, SwiperSlide} from "swiper/react";
import SponsoredCard from "./SponsoredCard";
import {useEffect, useState} from "react";
import {FilterEventsWithLocationBySponsored} from "../../../firebase/functions/event/event-filter";
import {
    SortEventWithCityBySponsor,
    SortEventWithCityByUpcoming,
    SortEventWithLocationByUpcoming
} from "../../../firebase/functions/event/sort-event";
import {ROUTES} from "../../../routes";
import {useNavigate} from "react-router-dom";

const Sponsored = ({currentCity}) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        let isMounted = true;
        if (currentCity.trim() !== "") {
            SortEventWithCityBySponsor(currentCity, 4).then((events) => {
                if (isMounted) {
                    setEvents(events);
                }
            });
        } else {
            FilterEventsWithLocationBySponsored(4).then((events) => {
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
                            Sponsored Activities
                        </Typography>
                        <Typography variant="body1" sx={{fontSize: {xs: 14, md: 16}}}>
                            They’ve paid their dues to get listed here.
                        </Typography>
                    </Box>
                    <Box sx={{transform: "rotate(-90deg)"}}>
                        <Button
                            onClick={function (e) {
                                e.preventDefault();
                                navigate(ROUTES.EVENTS_PAGE + "?type=sponsored-event");
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
                    pl: {xs: 0.5, md: "inherit"},
                }}
            >
                <Swiper
                    slidesPerView={1.3}
                    spaceBetween={20}
                    breakpoints={{
                        600: {
                            slidesPerView: 2.1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.7,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3.2,
                            spaceBetween: 20,
                        },
                    }}
                    grabCursor={true}
                    className="mySwiper"
                >
                    {events.map((event) => (
                        <SwiperSlide key={event.id}>
                            <SponsoredCard event={event}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    );
};

export default Sponsored;
