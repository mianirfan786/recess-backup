import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai";
import user from "../../images/user.jpg";
import styles from "../../styles/Home.module.scss";
import {ROUTES} from "../../routes";
import {useEffect, useState} from "react";
import {GetCurrentUserDetails} from "../../firebase/functions/user";
import Avatar from '@mui/material/Avatar';

const HomeHeader = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    useEffect(
        () => {
            GetCurrentUserDetails().then((data) => {
                setUserPhoto(data.photoURL)
                setUserName(data.displayName);
                if (data.displayName.split(" ").length >= 1) {
                    setFirstName(data.displayName.split(" ")[0]);
                    setLastName(data.displayName.split(" ")[1]);
                    setUserPhoto(data.photoURL);
                } else {
                    setFirstName(data.displayName);
                }
            });
        }, [])

    return (
        <Container sx={{py: {xs: 2, md: 4}}}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
            >
                <Stack className={styles.user} direction="row" gap={{xs: 1, md: 2}}>
                    <img src={userPhoto == "" || userPhoto == undefined ? "https://cdn1.iconfinder.com/data/icons/messenger-and-society/16/user_person_avatar_unisex-512.png" : userPhoto} alt="user"/>
                    <Box>
                        <Typography
                            sx={{opacity: 0.6, fontSize: 14}}
                            variant="subtitle1"
                            gutterBottom
                        >
                            Hello there
                        </Typography>
                        <Typography
                            sx={{fontSize: {xs: 18, md: 24}, fontWeight: 500}}
                            color="text.secondary"
                            variant="h3"
                        >
                            <b>{firstName}</b> {lastName}
                        </Typography>
                    </Box>
                </Stack>
                <Box>
                    <Button
                        onClick={() => navigate(ROUTES.CREATE_EVENT)}
                        sx={{
                            aspectRatio: "1/1",
                            bgcolor: "primary.main",
                            color: "info.main",
                            fontSize: {xs: 24, md: 30},
                            borderRadius: "50%",
                            width: {xs: "50px", sm: "60px"},
                            height: {xs: "50px", sm: "60px"},
                            minWidth: "unset",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: 1,
                            p: 0,
                        }}
                        variant="contained"
                    >
                        <AiOutlinePlus/>
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};

export default HomeHeader;
