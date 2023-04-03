import {Box, Typography} from "@mui/material";
import "swiper/css";
import {ROUTES} from "../../../routes";
import {useNavigate} from "react-router-dom";

const SponsoredCard = ({event}) => {
    const {id, photos, title, cost, bgColor} = event;
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                background: `url(${photos}) no-repeat center center `,
                backgroundSize: "cover",
                height: 350,
                borderRadius: "25px",
                p: 3,
                display: "flex",
                alignItems: "flex-end",
                zIndex: -1,
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(180.15deg, rgba(148, 192, 193, 0) 56.02%, ${bgColor} 73.84%, #7F9989 99.87%)`,
                    borderRadius: "25px",
                    zIndex: -1,
                },
            }}
        >
            <Box sx={{mt: "auto", width: 1}}>
                <Typography
                    variant="h4"
                    sx={{
                        color: "#fff",
                        width: 2 / 3,
                        zIndex: 9999,
                        mb: 2,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    onClick={function (e) {
                        e.preventDefault();
                        navigate(ROUTES.EVENT_DETAILS.replace(":id", id));
                    }}
                    variant="body1"
                    sx={{
                        width: 56,
                        height: 36,
                        lineHeight: "36px",
                        bgcolor: "info.main",
                        color: "text.primary",
                        borderRadius: "20px",
                        fontWeight: 700,
                        textAlign: "center",
                        padding: "2px 8px",
                        cursor: "pointer",
                    }}
                >
                    {cost == 0 ? "Free" : "$" + cost}
                </Typography>
            </Box>
        </Box>
    );
};

export default SponsoredCard;
