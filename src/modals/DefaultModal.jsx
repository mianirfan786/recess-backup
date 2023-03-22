import {Box, Modal} from "@mui/material";

const DefaultModal = ({children, open, onClose}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        outline: "none",
                        position: "absolute",
                        top: {xs: "100%", sm: "50%"},
                        left: {xs: 0, sm: "50%"},
                        transform: {
                            xs: "translate(0%, -100%)",
                            sm: "translate(-50%, -50%)",
                        },
                        width: "100%",
                        maxWidth: {xs: "100%", sm: "650px"},
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: {xs: 2, sm: 3},
                        borderRadius: "20px",
                    }}
                >
                    {children}
                </Box>
            </Modal>
        </Modal>
    );
};

export default DefaultModal;
