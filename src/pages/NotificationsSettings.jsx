import {Box, Container, Stack, Switch, Typography} from "@mui/material";
import PageHeader from "../components/PageHeader";
import {useState} from "react";
import {notificationTypes} from "../components/Notifications/NotificationsContainer";

const settings = [
    {
        title: "Event Reminder",
        description: "Amet minim mollit non deserunt ullamco.",
        color: "#FFB72D",
        type: notificationTypes.reminder,
    },
    {
        title: "Event Updates",
        description: "Amet minim mollit non deserunt ullamco.",
        color: "#2DC6FF",
        type: notificationTypes.update,
    },
    {
        title: "Event Added Near You",
        description: "Amet minim mollit non deserunt ullamco.",
        color: "#8BCD37",
        type: notificationTypes.new,
    },
    {
        title: "New Joining",
        description: "Amet minim mollit non deserunt ullamco.",
        color: "#37A8FD",
        type: notificationTypes.join,
    },
    {
        title: "Left Activity",
        description: "Amet minim mollit non deserunt ullamco.",
        color: "#FF0000",
        type: notificationTypes.left,
    },
];

const NotificationsSettings = () => {
    const [state, setState] = useState({
        [notificationTypes.reminder]: false,
        [notificationTypes.update]: false,
        [notificationTypes.new]: false,
        [notificationTypes.join]: false,
        [notificationTypes.left]: false,
    });

    return (
        <Container sx={{mt: 3, mb: 1}}>
            <Stack gap={3}>
                <PageHeader title="Notifications Settings"/>
                <Stack gap={2}>
                    {settings.map(({title, description, color, type}) => (
                        <Stack
                            key={title}
                            borderRadius="15px"
                            bgcolor="white"
                            gap={2}
                            p={2}
                            flexDirection="row"
                        >
                            <Box
                                borderRadius="50%"
                                width="20px"
                                height="20px"
                                minWidth="20px"
                                sx={{
                                    backgroundColor: color,
                                }}
                            />
                            <Stack gap="4px">
                                <Typography fontWeight="bold" variant="body1" color={color}>
                                    {title}
                                </Typography>
                                <Typography variant="body1">{description}</Typography>
                            </Stack>
                            <Box alignSelf="center" ml="auto">
                                <Switch
                                    onClick={() =>
                                        setState((prev) => ({...prev, [type]: !prev[type]}))
                                    }
                                    checked={state[type]}
                                />
                            </Box>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};

export default NotificationsSettings;
