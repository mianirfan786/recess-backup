import { Box, Container, Typography } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import evenUser1 from "../../../images/even-user-1.png";
import evenUser2 from "../../../images/even-user-2.png";
import evenUser3 from "../../../images/even-user-3.png";
import vollyballMatch from "../../../images/vollyball-match.png";
import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    title: "Vollyball Match",
    date: "25 Jun, 2022",
    time: "10:00 am",
    bgcolor: "#80CAD3",
    image: vollyballMatch,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
  {
    id: 2,
    title: "Fresbey",
    date: "25 Jun, 2022",
    time: "10:00 am",
    bgcolor: "#CACA99",
    image: vollyballMatch,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
  {
    id: 3,
    title: "Basketball",
    date: "25 Jun, 2022",
    time: "10:00 am",
    bgcolor: "#F2B9B9",
    image: vollyballMatch,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
  {
    id: 4,
    title: "Football Match",
    date: "25 Jun, 2022",
    time: "10:00 am",
    bgcolor: "#80CAD3",
    image: vollyballMatch,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
];

const Upcoming = () => {
  return (
    <Container sx={{ py: { xs: 2, md: 4 } }}>
      <Typography
        sx={{ fontSize: { xs: 30, md: 44 }, fontWeight: 700 }}
        color="text.secondary"
        variant="h3"
      >
        Upcoming Events
      </Typography>
      <Box sx={{ my: 4 }}>
        <Swiper
          slidesPerView={1.3}
          spaceBetween={20}
          breakpoints={{
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
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default Upcoming;
