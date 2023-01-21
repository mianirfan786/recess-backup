import { Box, Container, Stack, Typography } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import user from "../../images/user.jpg";
import styles from "../../styles/Home.module.scss";

const Header = () => {
  return (
    <Container sx={{ py: { xs: 2, md: 4 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Stack className={styles.user} direction="row" gap={{ xs: 1, md: 2 }}>
          <img src={user} alt="user" />
          <Box>
            <Typography
              sx={{ opacity: 0.6, fontSize: 14 }}
              variant="subtitle1"
              gutterBottom
            >
              Hello there
            </Typography>
            <Typography
              sx={{ fontSize: { xs: 18, md: 24 }, fontWeight: 500 }}
              color="text.secondary"
              variant="h3"
            >
              <b>Christoph</b> Hellmuth
            </Typography>
          </Box>
        </Stack>
        <Box>
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "info.main",
              fontSize: { xs: 24, md: 30 },
              borderRadius: "50%",
              width: { xs: 42, md: 60 },
              height: { xs: 42, md: 60 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: 3,
            }}
            variant="contained"
          >
            <AiOutlinePlus />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Header;
