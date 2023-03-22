import {Box, IconButton, Stack, Typography} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import user from "../../images/user.jpg";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../routes";

const Header = () => {
    const navigate = useNavigate();

    return (
        <Stack position="relative" flexDirection="row">
            <Box sx={{transform: "translateY(-50%)"}} top="50%" position="absolute">
                <Box
                    maxWidth={{xs: "70px", sm: "100px"}}
                    sx={{aspectRatio: "1/1"}}
                    borderRadius="50%"
                    overflow="hidden"
                    backgroundColor="#FFFF"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <img
                        style={{
                            objectFit: "cover",
                            width: "100%",
                        }}
                        src={user}
                        alt="user"
                    />
                </Box>
            </Box>
            <Typography
                width="100%"
                ml={{xs: 0, sm: 16}}
                textAlign={{xs: "center", sm: "initial"}}
                variant="h3"
            >
                Notifications
            </Typography>
            <IconButton
                onClick={() => navigate(ROUTES.NOTIFICATIONS_SETTINGS)}
                sx={{width: "40px", height: "40px", position: "absolute", right: 0}}
            >
                <SettingsIcon/>
            </IconButton>
        </Stack>
    );
};

export default Header;
