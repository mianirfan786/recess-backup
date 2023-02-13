import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { useModalsContext } from "../../modals/ModalsContext";
import { MODALS } from "../../modals/modals";

const activities = [...new Array(20)].map((_, i) => ({
  title: "Basketball",
  participants: 123,
  id: i + 1,
}));

const Requested = () => {
  const { setOpenModal } = useModalsContext();

  return (
    <Box sx={{ bgcolor: "#F6FBF9" }}>
      <Container sx={{ py: { xs: 2, md: 4 } }}>
        <Stack gap={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h3" gutterBottom>
                Activities Requested by You
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 16 } }}>
                The activities below are in high demand.
              </Typography>
            </Box>
            <Box sx={{ transform: "rotate(-90deg)" }}>
              <Button sx={{ color: "text.primary" }} variant="text">
                See all
              </Button>
            </Box>
          </Stack>
          <Stack flexDirection="row" flexWrap="wrap" gap={1}>
            <IconButton
              onClick={() => setOpenModal(MODALS.TAGS)}
              sx={{ backgroundColor: "white" }}
            >
              <AiOutlinePlus />
            </IconButton>
            {activities.map(({ id, title, participants }) => (
              <Box
                borderRadius="20px"
                sx={{
                  backgroundColor: "white",
                  width: "content-box",
                  cursor: "pointer",
                }}
                p="10px"
                key={id}
              >
                {title} ({participants})
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Requested;
