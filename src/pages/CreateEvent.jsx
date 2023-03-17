import React, {useState} from "react";
import {Button, Container, Stack} from "@mui/material";
import PageHeader from "../components/PageHeader";
import SetPhoto from "../components/CreateEvent/SetPhoto";
import MainDetails from "../components/CreateEvent/MainDetails";
import Map from "../components/CreateEvent/Map";
import {toast} from "react-toastify";
import {addEvent} from "../firebase/functions/event/index.js";

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
        selected: "",
        keywords: "",
        maxParticipants: 0,
        cost: 0,
        displayAddress: "",
        address: null
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (state.photos === null || state.title === "" || state.description === "" || state.keywords === "" || state.maxParticipants === 0) {
            toast("All fields must be filled", {type: "error"})
            return;
        }
        if (state.startTime >= state.endTime) {
            toast("Start time must be before end time and must be filled", {type: "error"})
            return;
        }
        if (state.date === "") {
            toast("Date must be filled", {type: "error"})
            return;
        }
        console.log(state.selected);
        addEvent(state).then(
            () => {
                toast("Event created successfully", {type: "success"})
            }
        );
    }

    return (
        <CreateEventContext.Provider value={{...state, setState}}>
            <Container sx={{my: 4}}>
                <PageHeader mb={4} title="Create New Event"/>
                <form onSubmit={handleSubmit}>
                    <Stack alignItems="center" gap={4}>
                        <SetPhoto/>
                        <MainDetails/>
                        <Map/>
                        <Button
                            sx={{
                                px: 3,
                                borderRadius: 50,
                                fontSize: {xs: 14, md: 16},
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
                            type="submit">Create Event</Button>
                    </Stack>
                </form>
            </Container>
        </CreateEventContext.Provider>
    );
};

export default CreateEvent;
