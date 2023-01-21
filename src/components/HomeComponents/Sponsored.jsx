import { Box, Button, Container, Stack, Typography } from "@mui/material";
import basketball from "../../images/basketball.png";
import outdoor from "../../images/outdoor.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

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
    <Box>
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
              <Box
                sx={{
                  background: `url(${event.image}) no-repeat center center `,
                  backgroundSize: "cover",
                  height: 350,
                  borderRadius: "25px",
                  p: 3,
                  display: "flex",
                  alignItems: "flex-end",
                  zIndex: -1,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: event.bgGradient,
                    borderRadius: "25px",
                    zIndex: -1,
                  },
                }}
              >
                <Box sx={{ mt: "auto" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      width: 2 / 3,
                      zIndex: 9999,
                      mb: 2,
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      width: 56,
                      height: 36,
                      lineHeight: "36px",
                      bgcolor: "info.main",
                      color: "text.primary",
                      borderRadius: "20px",
                      fontWeight: 700,
                      textAlign: "center",
                      padding: "2px 8px",
                    }}
                  >
                    ${event.price}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Sponsored;
