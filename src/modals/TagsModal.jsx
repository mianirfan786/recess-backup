import DefaultModal from "./DefaultModal";
import {Box, Stack, Typography} from "@mui/material";
import basketballTag from "../images/basketball-tag.png";
import {useEffect, useState} from "react";
import {GetKeywordsFromAllEvents} from "../firebase/functions/event";
import {AddKeywordInUser} from "../firebase/functions/user";

const tags = [...new Array(20)].map((_, i) => ({
    title: "Basketball",
    image: basketballTag,
    id: i + 1,
}));

const TagsModal = ({open, onClose, onData}) => {
    const [_tags, setTags] = useState(tags);
    useEffect(() => {
        GetKeywordsFromAllEvents().then((data) => {
            setTags(data);
        });
    }, []);

    const onTagClick = (tag) => {
        AddKeywordInUser(tag);
        onData()
        onClose();
    };

    const AddKeyword = (e) => {
        if (e.key === "Enter") {
            AddKeywordInUser(e.target.value);
            onData()
            onClose();
        }
    }

    return (
        <DefaultModal open={open} onClose={onClose}>
            <Stack textAlign="center" gap={3}>
                <Typography variant="h4">Tags</Typography>
                <Stack
                    flexWrap="wrap"
                    maxHeight={{xs: "50vh", sm: "500px"}}
                    overflow="auto"
                    flexDirection="row"
                >
                    {_tags.map((tag) => {
                        return (
                            <Box
                                onClick={() => onTagClick(tag)}
                                borderRadius="20px"
                                key={Math.random().toString(36).substring(2)}
                                sx={{
                                    backgroundColor: "#EBF2FB",
                                    margin: "4px",
                                    width: "content-box",
                                    cursor: "pointer",
                                }}
                                p="10px"
                            >
                                <b> + </b> {tag}
                            </Box>
                        );
                    })}
                    <Box>
                        <input
                            onKeyPress={AddKeyword}
                            type="text"
                            placeholder="Add your own tag"
                            style={{
                                borderRadius: "20px",
                                outline: "none",
                                border: "none",
                                backgroundColor: "#EBF2FB",
                                padding: "12px 20px",
                                margin: "4px",
                                width: "100%",
                            }}
                            />
                    </Box>
                </Stack>
            </Stack>
        </DefaultModal>
    );
};

export default TagsModal;
