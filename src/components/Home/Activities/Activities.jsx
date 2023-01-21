import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import "swiper/css";
import frisbee from "../../../images/firsbee-4.png";
import EventCard from "../../EventCard/EventCard";

const events = [
  {
    id: 1,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    des: "Hosting Guide",
    image: frisbee,
  },
  {
    id: 2,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    des: "Hosting Guide",
    image: frisbee,
  },
];

const Activities = () => {
  return (
    <Box sx={{ bgcolor: "#EBF2FB" }}>
      <Container sx={{ py: { xs: 2, md: 4 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h3" gutterBottom>
              Activities Hosted by You
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 16 } }}>
              The activities below are in high demand.
            </Typography>
          </Box>
          <Box sx={{ transform: "rotate(-90deg)" }}>
            <Button sx={{ color: "text.primary" }} variant="text">
              See all
            </Button>
          </Box>
        </Stack>
      </Container>
      <Container sx={{ py: { xs: 2, md: 4 } }}>
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 4, md: 8 }}
          >
            {events.map((event) => (
              <Grid item xs={2} sm={4} md={4} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Activities;
