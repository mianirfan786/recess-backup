import {Avatar, Stack, Typography} from "@mui/material";
import timeSince from "../../utils/timeSince";
import mensFace from "../../images/men-face.jpg";
import {GetUsersById} from "../../firebase/functions/user";
import {useEffect, useState} from "react";


const Comment = ({comment}) => {
    const [user, setUser] = useState({displayName: "Loading...", image: mensFace});
    const {userId, text, timeStamp} = comment;
    let commentTime = new Date(timeStamp);
    try {
        var timeSinceComment = timeSince(commentTime);
    } catch (e) {
        var timeSinceComment = "Loading...";
    }
    useEffect(() => {
        GetUsersById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    return (
        <Stack flexDirection="row" gap={2}>
            <Avatar src={mensFace}/>
            <Stack gap={1}>
                <Typography variant="body2" fontWeight="bold">
                    {user.displayName}
                </Typography>
                <Typography variant="body1">{text}</Typography>
                <Stack color="#6C6F72" flexDirection="row" gap={2}>
                    <Typography variant="body2">{timeSinceComment}</Typography>
                    <Typography sx={{cursor: "pointer"}} variant="body2">
                        Reply
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Comment;
