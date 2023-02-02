import { Swiper } from "swiper/react";
import { Container } from "@mui/material";

const DefaultSwiper = ({ children }) => (
  <Container sx={{ padding: "0 0 !important" }}>
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
    >
      {children}
    </Swiper>
  </Container>
);

export default DefaultSwiper;
