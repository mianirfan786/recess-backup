import { Box, Button, Stack, Typography } from "@mui/material";
import "swiper/css";

const RecentlyAddedCard = ({ event }) => {
  const { image, title, date, time, bgGradient } = event;
  return (
    <Box
      sx={{
        background: `url(${image}) no-repeat center center `,
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
          background: bgGradient,
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
            {title}
          </Typography>
          <Stack
            direction="row"
            sx={{ my: { xs: 1, md: 2 } }}
            gap={{ xs: 0.5, md: 1 }}
          >
            <Typography color="info.main" variant="h6">
              {date} .
            </Typography>

            <Typography color="info.main" variant="h6">
              {time}
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
  );
};

export default RecentlyAddedCard;