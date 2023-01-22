import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import "swiper/css";
import evenUser1 from "../../../images/even-user-1.png";
import evenUser2 from "../../../images/even-user-2.png";
import evenUser3 from "../../../images/even-user-3.png";
import frisbee1 from "../../../images/frisbee-1.png";
import frisbee2 from "../../../images/frisbee-2.png";
import EventCard from "../../EventCard/EventCard";

const events = [
  {
    id: 1,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    participant: 21,
    date: "",
    time: "",
    image: frisbee1,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
  {
    id: 2,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    participant: 0,
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: frisbee2,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
];

const Popular = () => {
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
              Most Popular
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 16 } }}>
              The highest attended activities in your area.
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
            columns={{ xs: 2, sm: 8, md: 8 }}
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

export default Popular;
