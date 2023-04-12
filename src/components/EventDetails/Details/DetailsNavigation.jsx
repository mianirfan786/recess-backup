import {Box, IconButton} from "@mui/material";
import BackButton from "../../../icons/BackIcon";
import ShareIcon from "../../../icons/ShareIcon";
import InfoIcon from "../../../icons/InfoIcon";
import {useNavigate} from "react-router-dom";
import {useModalsContext} from "../../../modals/ModalsContext";
import {MODALS} from "../../../modals/modals";
import {toast} from "react-toastify";

const iconStyle = {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1/1",
    width: {xs: "30px", sm: "40px"},
    height: {xs: "30px", sm: "40px"},
    opacity: 0.8,
    padding: "7px",
};

const DetailsNavigation = ({eventFlagged, event}) => {
    const navigate = useNavigate();
    const {setOpenModal} = useModalsContext();

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <IconButton onClick={() => navigate(-1)} size="small" sx={iconStyle}>
                <BackButton/>
            </IconButton>
            <Box display="flex" alignItems="center" gap={2}>
                <IconButton
                    onClick={() => {
                        if (navigator.share !== undefined) {
                            navigator
                                .share({
                                    title: event?.title,
                                    text: event?.description,
                                    url: window.location.href,
                                })
                                .catch(err => console.error("error"));
                        } else {
                            toast("Password is incorrect", {type: "error"})
                        }
                    }}
                    size="small" sx={iconStyle}>
                    <ShareIcon/>
                </IconButton>
                {!eventFlagged && (
                    <IconButton
                        onClick={() => setOpenModal(MODALS.EVENT_FLAG)}
                        size="small"
                        sx={iconStyle}
                    >
                        <InfoIcon/>
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default DetailsNavigation;
