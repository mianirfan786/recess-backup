import DefaultModal from "./DefaultModal";
import {Button, Stack, Typography} from "@mui/material";
import React, {useState} from "react";

const AddKeywordModal = ({open, onClose}) => {
    const [keyword, setKeyword] = useState("");

    return (
        <DefaultModal open={open} onClose={onClose}>
            <Stack textAlign="center" gap={3}>
                <Typography variant="h4">Add Keyword</Typography>
                <Stack
                    width="100%"
                    borderRadius="15px"
                    p={2}
                    sx={{backgroundColor: "#F2F4F9"}}
                >
                    <Typography sx={{opacity: 0.5}} variant="body2">
                        Keyword
                    </Typography>
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        type="text"
                        style={{
                            border: "none",
                            outline: "none",
                            fontSize: "16px",
                        }}
                    />
                </Stack>
                <Button
                    onClick={onClose}
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
                    Submit
                </Button>
            </Stack>
        </DefaultModal>
    );
};

export default AddKeywordModal;
