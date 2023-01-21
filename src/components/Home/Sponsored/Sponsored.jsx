import { Box, Button, Container, Stack, Typography } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import basketball from "../../../images/basketball.png";
import outdoor from "../../../images/outdoor.png";
import SponsoredCard from "./SponsoredCard";

const events = [
  {
    id: 1,
    title: "Basketball Conference",
    image: basketball,
    price: 26,
    bgGradient:
      "linear-gradient(180.15deg, rgba(148, 192, 193, 0) 56.02%, #996C5B 73.84%, #7F9989 99.87%)",
  },
  {
    id: 2,
    title: "Outdoor Birthday Party",
    image: outdoor,
    price: 26,
    bgGradient:
      "linear-gradient(180deg, rgba(241, 225, 210, 0) 47.93%, #EBC299 69.09%, #EBC299 100%)",
  },
  {
    id: 3,
    title: "Basketball Conference",
    image: basketball,
    price: 26,
    bgGradient:
      "linear-gradient(180.15deg, rgba(148, 192, 193, 0) 56.02%, #996C5B 73.84%, #7F9989 99.87%)",
  },
  {
    id: 4,
    title: "Basketball Conference",
    image: basketball,
    price: 26,
    bgGradient:
      "linear-gradient(180.15deg, rgba(148, 192, 193, 0) 56.02%, #996C5B 73.84%, #7F9989 99.87%)",
  },
];

const Sponsored = () => {
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
              Sponsored Activities
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 16 } }}>
              They’ve paid their dues to get listed here.
            </Typography>
          </Box>
          <Box sx={{ transform: "rotate(-90deg)" }}>
            <Button sx={{ color: "text.primary" }} variant="text">
              See all
            </Button>
          </Box>
        </Stack>
      </Container>
      <Container
        sx={{
          py: { xs: 2, md: 4 },
          pr: { xs: 0, md: "inherit" },
          pl: { xs: 0.5, md: "inherit" },
        }}
      >
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
              <SponsoredCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Sponsored;
