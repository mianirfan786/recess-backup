import {Avatar, Box, Stack, Typography} from "@mui/material";
import timeSince from "../../utils/timeSince";

export const notificationTypes = {
    reminder: "Reminder",
    update: "Update",
    new: "New",
    message: "Message",
    join: "Join",
    left: "Left",
};

const notifications = [...new Array(10)].map((_, i) => ({
    date: new Date(),
    id: i,
    description:
        "GolfPals begins tomorrow at 5:30am in City, State. Please arrive 15 minutes early.",
    type: notificationTypes.update,
    image: "",
}));

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
    return (
        <Stack gap={2}>
            {notifications.map(({type, date, id, description}) => (
                <Box
                    key={id}
                    sx={{backgroundColor: "white"}}
                    p={2}
                    borderRadius="20px"
                >
                    <Stack gap={2} flexDirection="row">
                        <Avatar/>
                        <Stack gap="4px">
                            {renderNotificationTitle(type)}
                            <Typography variant="body1">{description}</Typography>
                        </Stack>
                        <Typography
                            display={{xs: "none", sm: "block"}}
                            ml="auto"
                            variant="body1"
                            sx={{opacity: 0.5}}
                        >
                            {timeSince(date)}
                        </Typography>
                    </Stack>
                    <Typography
                        mt={2}
                        display={{xs: "block", sm: "none"}}
                        textAlign="end"
                        variant="body1"
                        sx={{opacity: 0.5}}
                    >
                        {timeSince(date)}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
};

export default NotificationsContainer;
