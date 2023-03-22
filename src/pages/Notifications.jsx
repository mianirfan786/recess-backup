import {Container, Stack} from "@mui/material";
import Header from "../components/Notifications/Header";
import NotificationsContainer from "../components/Notifications/NotificationsContainer";

const Notifications = () => {
    return (
        <Container sx={{mt: {xs: 4, sm: 6}, mb: {xs: 0, sm: 2}}}>
            <Stack gap={6}>
                <Header/>
                <NotificationsContainer/>
            </Stack>
        </Container>
    );
};

export default Notifications;
