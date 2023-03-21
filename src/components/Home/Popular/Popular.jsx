import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import "swiper/css";
import EventCard from "../../EventCard/EventCard";
import {useEffect, useState} from "react";
import {
    SortEventWithCityByPopular,
    SortEventWithCityBySponsor,
    SortEventWithLocationByPopular
} from "../../../firebase/functions/event/sort-event";
import {FilterEventsWithLocationBySponsored} from "../../../firebase/functions/event/event-filter";
import {ROUTES} from "../../../routes";
import {useNavigate} from "react-router-dom";

const Popular = ({currentCity}) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        let isMounted = true;
        if (currentCity.trim() !== "") {
            SortEventWithCityByPopular(currentCity, 4).then((events) => {
                if (isMounted) {
                    setEvents(events);
                }
            });
        } else {
            SortEventWithLocationByPopular(4,-1,-1).then((events) => {
                if (isMounted) {
                    setEvents(events);
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [currentCity]);
    useEffect(() => {
        SortEventWithLocationByPopular(2).then((events) => {
            setEvents(events);
        });
    }, []);
    return (
        <Box sx={{bgcolor: "#EBF2FB"}}>
            <Container sx={{py: {xs: 2, md: 4}}}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            Most Popular
                        </Typography>
                        <Typography variant="body1" sx={{fontSize: {xs: 14, md: 16}}}>
                            The highest attended activities in your area.
                        </Typography>
                    </Box>
                    <Box sx={{transform: "rotate(-90deg)"}}>
                        <Button
                            onClick={function (e) {
                                e.preventDefault();
                                navigate(ROUTES.EVENTS_PAGE + "?type=popular-event");
                            }}
                            sx={{color: "text.primary"}} variant="text">
                            See all
                        </Button>
                    </Box>
                </Stack>
            </Container>
            <Container sx={{py: {xs: 2, md: 4}}}>
                <Box>
                    <Grid
                        container
                        spacing={{xs: 2, md: 3}}
                        columns={{xs: 2, sm: 8, md: 8}}
                    >
                        {events.map((event) => (
                            <Grid item xs={2} sm={4} md={4} key={event.id}>
                                <EventCard event={event}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Popular;
