import { Button, IconButton, Stack, Typography } from "@mui/material";
import DefaultModal from "./DefaultModal";
import CustomDivider from "../components/CustomDivider";
import { useState } from "react";
import {JoinEventById} from "../firebase/functions/event/event-join";

const EventConfirmationModal = (props) => {
  const {
    id,
    title,
    location,
    participant,
    date,
    time,
    image,
    description,
    coordinates,
  } = props;

  const [attendees, setAttendees] = useState(0);

  const onModalClose = () => {

    JoinEventById(id, attendees);
    setAttendees(0);
    props.onClose();
  };

  return (
    <DefaultModal open={props.open} onClose={onModalClose}>
      <Stack textAlign="center" gap={3}>
        <Typography variant="h4">Event Confirmation</Typography>
        <Typography variant="h3">{title}</Typography>
        <Stack gap={2}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">City</Typography>
            <Typography color="primary" variant="body1" fontWeight="bold">
              {location}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Date</Typography>
            <Typography variant="body1" fontWeight="bold">
              {date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Time</Typography>
            <Typography variant="body1" fontWeight="bold">
              {props.startTime} - {props.endTime}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Address</Typography>
            <Typography variant="body1" fontWeight="bold">
              123 Main Street Scottsdale, AZ 85555
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Keyword</Typography>
            <Typography variant="body1" fontWeight="bold">
              {props.keywords}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Max Players</Typography>
            <Typography variant="body1" fontWeight="bold">
              {props.maxParticipants}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Latitude</Typography>
            <Typography variant="body1" fontWeight="bold">
              {props.event.coordinates.lat.toFixed(2)}
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Longitude</Typography>
            <Typography variant="body1" fontWeight="bold">
              {props.event.coordinates.lng.toFixed(2)}
            </Typography>
          </Stack>
        </Stack>
        <CustomDivider />
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">How many attendees?</Typography>
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <IconButton
              sx={{ backgroundColor: "#E7E8ED", width: "30px", height: "30px" }}
              onClick={() => {
                if (attendees > 0) {
                  setAttendees((prev) => prev - 1);
                }
              }}
            >
              -
            </IconButton>
            <Typography variant="body1" fontWeight="bold">
              {attendees}
            </Typography>
            <IconButton
              sx={{ backgroundColor: "#E7E8ED", width: "30px", height: "30px" }}
              onClick={() => setAttendees((prev) => prev + 1)}
            >
              +
            </IconButton>
          </Stack>
        </Stack>
        <CustomDivider />
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">Participation Cost</Typography>
          <Typography variant="body1" fontWeight="bold">
            {props.cost ? `$${props.cost}` : "Free"}
          </Typography>
        </Stack>
        <Button
          onClick={onModalClose}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#000",
            color: "info.main",
            borderRadius: 8,
            padding: 1,
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          Confirm
        </Button>
      </Stack>
    </DefaultModal>
  );
};

export default EventConfirmationModal;
