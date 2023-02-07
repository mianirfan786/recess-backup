import { Box, Button, Stack, Typography } from "@mui/material";
import { BsCalendarEvent } from "react-icons/bs";
import styles from "../../../styles/Home.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";

const UpcomingCard = ({ event }) => {
  const { title, time, date, bgcolor, image, eventJoined } = event;
  const navigate = useNavigate();
  return (
    <Box
      className={styles.eventCard}
      sx={{
        bgcolor: `${bgcolor}`,
        p: { xs: 1, md: 1.5 },
        borderRadius: "25px",
      }}
    >
      <img className={styles.eventThumb} src={image} alt="" />
      <Box sx={{ my: { xs: 1, md: 2 }, px: 1 }}>
        <Typography color="info.main" variant="h4">
          {title}
        </Typography>
        <Stack
          direction="row"
          sx={{ my: { xs: 1, md: 2 } }}
          gap={{ xs: 0.5, md: 1 }}
        >
          <BsCalendarEvent className={styles.calendarIcon} />
          <Typography color="info.main" variant="h6">
            {date} .
          </Typography>

          <Typography color="info.main" variant="h6">
            {time}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
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
          <Button
            onClick={() => navigate(ROUTES.EVENT_DETAILS)}
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
      </Box>
    </Box>
  );
};

export default UpcomingCard;
