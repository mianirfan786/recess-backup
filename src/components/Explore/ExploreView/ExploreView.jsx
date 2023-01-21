import { Box, Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import { BsGrid } from "react-icons/bs";
import ExploreFilter from "../ExploreHeader/ExploreFilter";
import ListView from "../ListView/ListView";
import MapView from "../MapView/MapView";

import evenUser1 from "../../../images/even-user-1.png";
import evenUser2 from "../../../images/even-user-2.png";
import evenUser3 from "../../../images/even-user-3.png";
import frisbee4 from "../../../images/firsbee-4.png";
import frisbee2 from "../../../images/frisbee-2.png";
import frisbee3 from "../../../images/frisbee-3.png";
import glof from "../../../images/glof.png";

const events = [
  {
    id: 1,
    title: "Ultimate Golf",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: glof,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
  {
    id: 2,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: frisbee2,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
  {
    id: 3,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: frisbee3,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
  {
    id: 4,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: frisbee4,
    eventJoined: [
      { id: 1, image: evenUser1 },
      { id: 2, image: evenUser2 },
      { id: 3, image: evenUser3 },
    ],
  },
];

const ExploreView = () => {
  const [view, setView] = useState("list");
  const handleView = (view) => {
    setView(view);
  };
  return (
    <Box sx={{ bgcolor: "info.main", py: { xs: 2, md: 4 } }}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Button
            sx={{
              borderRadius: 8,
              py: 1,
              px: 3,
              borderColor: "#CED1DC80",
              color: "text.secondary",
            }}
            startIcon={<BsGrid />}
            variant="outlined"
          >
            All Categories
          </Button>
          <ExploreFilter
            view={view}
            setView={setView}
            handleView={handleView}
          />
        </Stack>
      </Container>

      {/* show based on view */}
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        {view === "list" ? (
          <ListView events={events} />
        ) : (
          <MapView events={events} />
        )}
      </Box>
    </Box>
  );
};

export default ExploreView;
