import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "swiper/css";
import styles from "../../../styles/Home.module.scss";

const ActivitiesCard = ({ event }) => {
  const { id, image, title, location, des } = event;
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
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Box>
          <img className={styles.eventImage} src={image} alt="" />
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography
            sx={{ color: "text.primary", opacity: 0.7 }}
            variant="h6"
            gutterBottom
          >
            {location}
          </Typography>
          <Typography color="primary" variant="h6" gutterBottom>
            {des}
          </Typography>
        </Box>
        <Stack
          direction="column"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
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
        </Stack>
      </Stack>
    </Box>
  );
};

export default ActivitiesCard;
