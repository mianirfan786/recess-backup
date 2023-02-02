import { Avatar, Stack, Typography } from "@mui/material";
import timeSince from "../../utils/timeSince";

const Comment = ({ comment }) => {
  const { user, message, dateCreated } = comment;

  return (
    <Stack flexDirection="row" gap={2}>
      <Avatar src={user.image} />
      <Stack gap={1}>
        <Typography variant="body2" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="body1">{message}</Typography>
        <Stack color="#6C6F72" flexDirection="row" gap={2}>
          <Typography variant="body2">{timeSince(dateCreated)}</Typography>
          <Typography sx={{ cursor: "pointer" }} variant="body2">
            Reply
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Comment;
