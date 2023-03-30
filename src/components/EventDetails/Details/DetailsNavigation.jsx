import {Box, IconButton} from "@mui/material";
import BackButton from "../../../icons/BackIcon";
import ShareIcon from "../../../icons/ShareIcon";
import InfoIcon from "../../../icons/InfoIcon";
import {useNavigate} from "react-router-dom";
import {useModalsContext} from "../../../modals/ModalsContext";
import {MODALS} from "../../../modals/modals";

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

const DetailsNavigation = () => {
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
                        window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location.href),'facebook-share-dialog','width=626,height=436'); return false;
                    }}
                    size="small" sx={iconStyle}>
                    <ShareIcon/>
                </IconButton>
                <IconButton
                    onClick={() => setOpenModal(MODALS.EVENT_FLAG)}
                    size="small"
                    sx={iconStyle}
                >
                    <InfoIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default DetailsNavigation;
