import {Avatar, InputBase, Stack} from "@mui/material";
import {AddCommentInEventById} from "../../firebase/functions/event/event-comments";
import {GetCurrentUserDetails} from "../../firebase/functions/user";
import {useState} from "react";
import { useEffect } from "react";

const MessageBox = ({onData, id}) => {

    /* get current user */
    const [user, setUser] = useState({});
    useEffect(()=>{
        GetCurrentUserDetails().then(
            (data) => {
                setUser(data);
            }
        );
    },[])
        


    const demo = (e) => {
        if (e.key === "Enter") {
            AddCommentInEventById(id, e.target.value);
            e.target.value = "";
            setTimeout(() => {
                onData();
            }, 1000);
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
            <img style={{
                width: "46px",
                height: "46px",
            }} src={user?.photoURL ? user.photoURL : "https://cdn1.iconfinder.com/data/icons/messenger-and-society/16/user_person_avatar_unisex-512.png"} />
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
