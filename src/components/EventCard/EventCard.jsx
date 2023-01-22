import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "swiper/css";
import styles from "../../styles/Event.module.scss";

const EventCard = ({ event }) => {
  const {
    id,
    image,
    title,
    location,
    participant,
    date,
    time,
    eventJoined,
    des,
  } = event;
  const [like, setLike] = useState({ id: null, isLike: false });
  const handleLike = (id) => {
    setLike({ id: id, isLike: !like.isLike });
  };
  return (
    <Box
      sx={{
        bgcolor: "#CBE8FF",
        p: { xs: 1, md: 2 },
        borderRadius: "20px",
      }}
    >
      <Stack
        direction="row"
        justifyContent={{ xs: "inherit", lg: "space-between" }}
        gap={2}
      >
        <Box>
          <img className={styles.eventImage} src={image} alt="" />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: { xs: 17, md: 20 } }}
            variant="h5"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "text.primary",
              opacity: 0.7,
              fontSize: { xs: 12, md: 14 },
            }}
            variant="h6"
            gutterBottom
          >
            {location}
          </Typography>
          {des && (
            <Typography
              sx={{ fontSize: { xs: 12, md: 14 } }}
              color="primary"
              variant="h6"
              gutterBottom
            >
              {des}
            </Typography>
          )}
          {participant > 0 && (
            <Typography
              sx={{ fontSize: { xs: 12, md: 14 }, mb: { xs: 1, md: 2 } }}
              variant="body1"
              color="error"
            >
              {participant} participants
            </Typography>
          )}
          {date && time && (
            <Stack
              direction="row"
              sx={{ mb: { xs: 1, md: 2 } }}
              gap={{ xs: 0.5, md: 1 }}
            >
              <Typography
                sx={{ fontSize: { xs: 12, md: 14 } }}
                color="error"
                variant="h6"
              >
                {date} .
              </Typography>

              <Typography
                sx={{ fontSize: { xs: 12, md: 14 } }}
                color="error"
                variant="h6"
              >
                {time}
              </Typography>
            </Stack>
          )}
          {eventJoined?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, md: 1 },
              }}
              className={styles.eventJoined}
            >
              <Box>
                {eventJoined.map((user) => (
                  <img key={user.id} src={user.image} alt="" />
                ))}
              </Box>
              <Typography color="info.main" variant="h6">
                +20
              </Typography>
            </Box>
          )}
          {/* on mobile screen, join and like */}
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            sx={{ display: { xs: "flex", lg: "none" }, my: 1 }}
          >
            <Box
              onClick={() => handleLike(id)}
              sx={{
                fontSize: 16,
                bgcolor: "info.main",
                color:
                  like.isLike && like.id === id
                    ? "error.main"
                    : "text.secondary",
                width: 32,
                height: 32,
                lineHeight: "36px",
                textAlign: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              {like.isLike && like.id === id ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </Box>
            <Button
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 50,
                fontSize: { xs: 14, md: 16 },
                fontWeight: 700,
                textTransform: "capitalize",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
                color: "text.primary",
                boxShadow: 0,
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "info.main",
                  boxShadow: 0,
                },
              }}
              variant="contained"
              color="info"
            >
              Join
            </Button>
          </Stack>
        </Box>
        {/* on desktop screen, join and like */}
        <Stack
          direction="column"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          <Box
            onClick={() => handleLike(id)}
            sx={{
              fontSize: 24,
              bgcolor: "info.main",
              color:
                like.isLike && like.id === id ? "error.main" : "text.secondary",
              width: 50,
              height: 50,
              lineHeight: "54px",
              textAlign: "center",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            {like.isLike && like.id === id ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
          </Box>
          <Button
            sx={{
              px: 3,
              borderRadius: 50,
              fontSize: { xs: 14, md: 16 },
              fontWeight: 700,
              textTransform: "capitalize",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
              color: "text.primary",
              boxShadow: 0,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "info.main",
                boxShadow: 0,
              },
            }}
            variant="contained"
            color="info"
          >
            Join
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventCard;
