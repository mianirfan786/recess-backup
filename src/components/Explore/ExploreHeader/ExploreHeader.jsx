import { Box, Container, Stack, Typography } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { useModalsContext } from "../../../modals/ModalsContext";
import { MODALS } from "../../../modals/modals";

const ExploreHeader = () => {
  const { setOpenModal } = useModalsContext();

  return (
    <Container sx={{ py: { xs: 2, md: 4 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Box>
          <Typography variant="h3">Explore</Typography>
        </Box>
        <Box>
          <Box
            onClick={() => setOpenModal(MODALS.SORT_FILTER)}
            sx={{
              bgcolor: "info.main",
              color: "#28303F",
              fontSize: { xs: 24, md: 30 },
              borderRadius: "50%",
              width: { xs: 42, md: 60 },
              height: { xs: 42, md: 60 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: 1,
            }}
            variant="contained"
          >
            <CiFilter />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ExploreHeader;
