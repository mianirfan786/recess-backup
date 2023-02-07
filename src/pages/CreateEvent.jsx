import React from "react";
import { Container, Stack } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import SetPhoto from "../components/CreateEvent/SetPhoto";
import MainDetails from "../components/CreateEvent/MainDetails";
import Map from "../components/CreateEvent/Map";

const CreateEventContext = React.createContext();
export const useCreateEventContext = () => React.useContext(CreateEventContext);

const CreateEvent = () => {
  const [state, setState] = useState({
    photos: [],
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    keywords: "",
    maxParticipants: 0,
    cost: 0,
  });

  return (
    <CreateEventContext.Provider value={{ ...state, setState }}>
      <Container sx={{ my: 4 }}>
        <PageHeader mb={4} title="Create New Event" />
        <Stack alignItems="center" gap={4}>
          <SetPhoto />
          <MainDetails />
          <Map />
        </Stack>
      </Container>
    </CreateEventContext.Provider>
  );
};

export default CreateEvent;
