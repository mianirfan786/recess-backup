import DefaultModal from "./DefaultModal";
import { Stack, Typography, TextareaAutosize, Button } from "@mui/material";
import { useState } from "react";

const FlagEventModal = ({ open, onClose }) => {
  const [reason, setReason] = useState("");

  const onModalClose = () => {
    setReason("");
    onClose();
  };

  return (
    <DefaultModal open={open} onClose={onModalClose}>
      <Stack textAlign="center" gap={3}>
        <Typography variant="h4">Flag this Event</Typography>
        <TextareaAutosize
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason"
          style={{
            backgroundColor: "#F2F4F9",
            border: "none",
            resize: "none",
            outline: "none",
            padding: "15px",
            borderRadius: "20px",
          }}
          maxRows={7}
          minRows={7}
        />
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
          Flag Now
        </Button>
      </Stack>
    </DefaultModal>
  );
};

export default FlagEventModal;
