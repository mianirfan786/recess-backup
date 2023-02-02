import { Stack, Typography } from "@mui/material";
import Comment from "./Comment";
import MessageBox from "./MessageBox";
import mensFace from "../../images/men-face.jpg";

const _comments = [...new Array(25)].map((_, index) => ({
  id: index,
  user: { name: "Leslie Alexander", image: mensFace },
  message: "Hey, Hows it going?",
  dateCreated: new Date(),
}));

const MessageBoard = ({ comments = _comments }) => {
  return (
    <Stack pt={2} gap={2} sx={{ backgroundColor: "#F6FBF9" }}>
      <Typography px={2} variant="body1">
        {comments.length} Comments
      </Typography>
      <Stack px={2} maxHeight="300px" overflow="auto" gap={2}>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </Stack>
      <MessageBox />
    </Stack>
  );
};

export default MessageBoard;
