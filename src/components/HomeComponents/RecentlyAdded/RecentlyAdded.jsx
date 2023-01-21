import { Box, Button, Container, Stack, Typography } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import baseball from "../../../images/baseball.png";
import frisbee from "../../../images/ultimate-frisbee.png";

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
                <Box sx={{ mt: "auto", width: 1 }}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#fff",
                        width: 2 / 3,
                        zIndex: 9999,
                        mb: 2,
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{ my: { xs: 1, md: 2 } }}
                      gap={{ xs: 0.5, md: 1 }}
                    >
                      <Typography color="info.main" variant="h6">
                        {event.date} .
                      </Typography>

                      <Typography color="info.main" variant="h6">
                        {event.time}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Button
                      sx={{
                        px: 3,
                        borderRadius: 50,
                        fontSize: { xs: 14, md: 16 },
                        fontWeight: 700,
                        textTransform: "capitalize",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
                        color: "text.primary",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "info.main",
                        },
                      }}
                      variant="contained"
                      color="info"
                    >
                      Join
                    </Button>
                    <Typography variant="body1" color="info.main">
                      1/8
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default RecentlyAdded;
