import {Stack, Typography} from "@mui/material";
import Comment from "./Comment";
import MessageBox from "./MessageBox";
import mensFace from "../../images/men-face.jpg";
import {useEffect, useState} from "react";
import {GetAllCommentsInEventById} from "../../firebase/functions/event/event-comments";

const MessageBoard = ({id}) => {
    const [comments, setComments] = useState([]);
    const reloadComments = () => {
        GetAllCommentsInEventById(id).then((data) => {
            setComments(data)
        });
    }
    useEffect(() => {
        GetAllCommentsInEventById(id).then((data) => {
            setComments(data)
        });
    }, []);
    return (
        <Stack pt={2} gap={2} sx={{backgroundColor: "#F6FBF9"}}>
            <Typography px={2} variant="body1">
                {comments && comments.length} Comments
            </Typography>
            <Stack px={2} maxHeight="300px" overflow="auto" gap={2}>
                {comments && comments.map((comment) => (
                    <Comment comment={comment} key={comment.id}/>
                ))}
            </Stack>
            <MessageBox onData={reloadComments} id={id}/>
        </Stack>
    );
};

export default MessageBoard;
