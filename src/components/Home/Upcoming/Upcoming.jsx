import {Box, Container, Typography} from "@mui/material";
import "swiper/css";
import {Swiper, SwiperSlide} from "swiper/react";
import UpcomingCard from "./UpcomingCard";
import {useEffect, useState} from "react";
import {
    SortEventWithCityByUpcoming,
    SortEventWithLocationByUpcoming
} from "../../../firebase/functions/event/sort-event";

const Upcoming = ({currentCity}) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        let isMounted = true;
        if (currentCity.trim() !== "") {
            SortEventWithCityByUpcoming(currentCity, 4).then((events) => {
                if (isMounted) {
                    setEvents(events);
                }
            });
        } else {
            SortEventWithLocationByUpcoming(4).then((events) => {
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
        <div>
            <Container
                sx={{
                    py: {xs: 2, md: 4},
                }}
            >
                <Typography
                    sx={{fontSize: {xs: 30, md: 44}, fontWeight: 700}}
                    color="text.secondary"
                    variant="h3"
                >
                    Upcoming Events
                </Typography>
            </Container>
            <Container
                sx={{
                    py: {xs: 2, md: 4},
                    pr: {xs: 0, md: "inherit"},
                    pl: {xs: 0.5, md: "inherit"},
                }}
            >
                <Box>
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
                                <UpcomingCard event={event}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Container>
        </div>
    );
};

export default Upcoming;
