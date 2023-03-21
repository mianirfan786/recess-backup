import {Avatar, InputBase, Stack} from "@mui/material";
import {AddCommentInEventById} from "../../firebase/functions/event/event-comments";

const MessageBox = ({id}) => {
    const demo = (e) => {
        if (e.key === "Enter") {
            AddCommentInEventById(id, e.target.value);
            e.target.value = "";
        }
    }
    return (
        <Stack
            flexDirection="row"
            gap={2}
            py={3}
            px={2}
            borderRadius="20px"
            sx={{backgroundColor: "#F7FAFF", border: "1px solid #E2EFFF"}}
        >
            <Avatar sizes="small"/>
            <InputBase
                onKeyPress={demo}
                fullWidth
                sx={{
                    backgroundColor: "white",
                    borderRadius: "40px",
                    paddingX: 2,
                    paddingY: 1,
                }}
                placeholder="Add comment"
            />
        </Stack>
    );
};

export default MessageBox;
