import {Avatar, Box, Stack, Typography} from "@mui/material";
import timeSince from "../../utils/timeSince";
import {getAllNotifications, returnJoinedNotifications} from "../../firebase/functions/messaging/notifications";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const notificationTypes = {
    reminder: "reminder",
    update: "update",
    new: "new-event",
    message: "message",
    join: "join",
    left: "Left",
};

const renderNotificationTitle = (type) => {
    let title = "";
    let color = "";




    switch (type) {
        case notificationTypes.reminder:
            title = "Event Reminder";
            color = "#FFB72D";
            break;
        case notificationTypes.update:
            title = "Event Updates";
            color = "#2DC6FF";
            break;
        case notificationTypes.new:
            title = "Events Added Near You";
            color = "#8BCD37";
            break;
        case notificationTypes.message:
            title = "Messaged";
            color = "#8237CD";

            break;
        case notificationTypes.join:
            title = "New Joining";
            color = "#37A8FD";

            break;
        case notificationTypes.left:
            title = "Left Activity";
            color = "#FF0000";

            break;
        default:
            title = "Notification";
            color = "black";
    }

    return (
        <Typography fontWeight="bold" variant="body1" color={color}>
            {title}
        </Typography>
    );
};

const NotificationsContainer = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllNotifications().then(
            () => {
                setNotifications(returnJoinedNotifications());
            }
        )
    }, []);
    return (
        <Stack gap={2}>
            {notifications.map(({type, time, title, link, id, description}) => (
                <Box
                    onClick={() => {
                        console.log(link);
                        if (link) {
                            const newA = document.createElement("a");
                            newA.href = link;
                            newA.target = "_blank";
                            newA.click();
                        }
                    }}
                    style={{cursor: link ? "pointer" : "default"}}
                    key={id}
                    sx={{backgroundColor: "white"}}
                    p={2}
                    borderRadius="20px"
                >
                    <Stack gap={2} flexDirection="row">
                        <Avatar/>
                        <Stack gap="4px">
                            {renderNotificationTitle(type)}
                            <Typography variant="body1">{title}</Typography>
                        </Stack>
                        <Typography
                            display={{xs: "none", sm: "block"}}
                            ml="auto"
                            variant="body1"
                            sx={{opacity: 0.5}}
                        >
                            {timeSince(time)}
                        </Typography>
                    </Stack>
                    <Typography
                        mt={2}
                        display={{xs: "block", sm: "none"}}
                        textAlign="end"
                        variant="body1"
                        sx={{opacity: 0.5}}
                    >
                        {timeSince(time)}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
};

export default NotificationsContainer;
