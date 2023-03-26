import {Box, Container, Grid} from "@mui/material";
import EventCard from "../../EventCard/EventCard";

const ListView = ({events}) => {
    return (
        <Container sx={{py: {xs: 2, md: 4}}}>
            <Box>
                <Grid
                    container
                    spacing={{xs: 2, md: 3}}
                    columns={{xs: 2, sm: 8, md: 8}}
                >
                    {events && events.map((event) => (
                        <Grid item xs={2} sm={4} md={4} key={event.id}>
                            <EventCard event={event}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default ListView;
