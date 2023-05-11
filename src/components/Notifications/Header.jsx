import {Avatar, Box, IconButton, Stack, Typography} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import user from "../../images/user.jpg";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../routes";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.UserReducer.userInfo)

    return (
        <Stack position="relative" flexDirection="row" marginTop={"1rem"}>
            <Box sx={{transform: "translateY(-50%)"}} top="50%" position="absolute">
                {/* <Box
                    maxWidth={{xs: "100px", sm: "100px"}}
                    sx={{aspectRatio: "1/1"}}
                    borderRadius="50%"
                    overflow="hidden"
                    backgroundColor="#FFFF"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                > */}
                    <Avatar sx={{width:"58px", height:"58px"}} src={userInfo.photoURL ? userInfo.photoURL : "https://cdn1.iconfinder.com/data/icons/messenger-and-society/16/user_person_avatar_unisex-512.png"}/>
                {/* </Box> */}
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
