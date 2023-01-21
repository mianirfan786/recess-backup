import { Box, Button, Container, Stack, Typography } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import baseball from "../../../images/baseball.png";
import frisbee from "../../../images/ultimate-frisbee.png";
import RecentlyAddedCard from "./RecentlyAddedCard";

const events = [
  {
    id: 1,
    title: "Ultimate Frisbee",
    image: frisbee,
    date: "Mon 26 Jun",
    time: "2:23 am",
    bgGradient:
      "linear-gradient(180deg, rgba(221, 231, 231, 0) 45.17%, #5E767A 67.46%, #5E767A 100%)",
  },
  {
    id: 2,
    title: "Baseball Cathes",
    image: baseball,
    date: "Mon 26 Jun",
    time: "2:23 am",
    bgGradient:
      "linear-gradient(180deg, rgba(121, 112, 141, 0) 47.93%, #28151B 69.09%, #28151B 100%)",
  },
  {
    id: 3,
    title: "Basketball Conference",
    image: frisbee,
    date: "Mon 26 Jun",
    time: "2:23 am",
    bgGradient:
      "linear-gradient(180deg, rgba(221, 231, 231, 0) 45.17%, #5E767A 67.46%, #5E767A 100%)",
  },
  {
    id: 4,
    title: "Basketball Conference",
    image: frisbee,
    date: "Mon 26 Jun",
    time: "2:23 am",
    bgGradient:
      "linear-gradient(180deg, rgba(221, 231, 231, 0) 45.17%, #5E767A 67.46%, #5E767A 100%)",
  },
];

const RecentlyAdded = () => {
  return (
    <Box sx={{ bgcolor: "#F6FBF9" }}>
      <Container sx={{ py: { xs: 2, md: 4 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h3" gutterBottom>
              Recently Added
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 16 } }}>
              The most recently added activities in your area.
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
        <Swiper
          slidesPerView={1.3}
          spaceBetween={20}
          breakpoints={{
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
          grabCursor={true}
          className="mySwiper"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <RecentlyAddedCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default RecentlyAdded;
