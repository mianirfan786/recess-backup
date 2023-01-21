import { Box, Typography } from "@mui/material";
import "swiper/css";

const SponsoredCard = ({ event }) => {
  const { image, title, price, bgGradient } = event;
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
          ${price}
        </Typography>
      </Box>
    </Box>
  );
};

export default SponsoredCard;
