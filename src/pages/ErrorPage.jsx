import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);

  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="gradient"
    >
      <Container
        sx={{
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sorry, an unexpected error has occurred.
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 30, md: 80, fontWeight: 700 },
            letterSpacing: 20,
            my: 2,
          }}
          variant="h3"
          color="error"
        >
          {error.status}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 20, md: 30 },
            fontWeight: 700,
            letterSpacing: 20,
            mb: 2,
          }}
          variant="h5"
        >
          {error.statusText || error.message}
        </Typography>
        <Button onClick={handleBackToHome} variant="contained">
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}
