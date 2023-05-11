import {Avatar, InputBase, Stack} from "@mui/material";
import {AddCommentInEventById} from "../../firebase/functions/event/event-comments";
import {useState} from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MessageBox = ({onData, id}) => {
    const userInfo = useSelector(state => state.UserReducer.userInfo)

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
            }} src={userInfo?.photoURL ? userInfo.photoURL : "https://cdn1.iconfinder.com/data/icons/messenger-and-society/16/user_person_avatar_unisex-512.png"} />
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
