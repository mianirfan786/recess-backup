import DefaultModal from "./DefaultModal";
import {Avatar, Box, Icon, Stack, Typography} from "@mui/material";
import basketballTag from "../images/basketball-tag.png";
import {useEffect, useState} from "react";
import {GetKeywordsFromAllEvents} from "../firebase/functions/event";
import {AddKeywordInUser} from "../firebase/functions/user";
import baseball from "../images/baseball_tag.svg";
import cricket  from "../images/cricket_tag.svg";
import foosball  from "../images/foosball_tag.svg";
import frisbee  from "../images/frisbee_tag.svg";
import tennis  from "../images/tennis_tag.svg";
import basketball  from "../images/basketball_tag.svg";
import { useSelector, useDispatch } from "react-redux"
import { setTagsFilter, setOpenTagModel } from "../store/ModelSlice";

const tags = [...new Array(20)].map((_, i) => ({
    title: "Basketball",
    image: basketballTag,
    id: i + 1,
}));

const TagModelExplore = () => {
    const dispatch = useDispatch();

    //Redux states
    const open = useSelector( state => state.ModelReducer.open )
    const tags = useSelector( state => state.ModelReducer.tags )
    
    const [_tags, set_Tags] = useState({});
    useEffect(() => {
        GetKeywordsFromAllEvents().then((data) => {
             let list = {   };
            for (let i = 0; i < data.length; i++) {
                const element = data[i].toLowerCase();
                if(element in list){
                    list[element] += 1; 
                }else{
                    list[element] = 1;
                }
                
               
            }
            set_Tags(list);

        });
    }, []);

    const onTagClick = (tag,index) => {
        if(tags.indexOf(tag)!==-1){
           const newTagsArray =  tags.filter((e)=>{
                if(e!==tag){
                    return e
                }
            })
           dispatch(setTagsFilter(newTagsArray));
        }
        else{
            dispatch(setTagsFilter([...tags,tag]));
        }
        dispatch(setOpenTagModel(false));
    };

    const onClose = () => {
        dispatch(setOpenTagModel(false));

    }



    const imgObj = {
        'baseball': baseball,
        'cricket': cricket,
        'foosball': foosball,
        'frisbee': frisbee,
        'tennis': tennis,
        'basketball': basketball,
        
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
                    justifyContent= "space-around"
                    alignItems = "center"
                    gap = "16px"

                >
                    {Object.keys(_tags).map((tag) => {
                        return (
                            <Box
                                onClick={() => onTagClick(tag)}
                                borderRadius="16px"
                                key={Math.random().toString(36).substring(2)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    width: "content-box",
                                    cursor: "pointer",
                                    gap:2,
                                    maxWidth: "min-content",
                                    border: tags.includes(tag)?"2px solid #2DC6FF":"2px solid transparent"
                                }}
                                p="0px"
                            >
                                <div style={{width: "100px", height: "100px", background: "#F6FBF9", padding: "15px", borderRadius: "1rem"}} >
                                <Avatar src={imgObj[tag]} alt={tag}  style={{width: "70px", height: "70px",}} />
                                </div>
                                <div>
                                {tag} {_tags[tag]>1?<span style={{marginLeft: "3px"}}>({_tags[tag]})</span>:<></>}
                                </div>
                                
                            </Box>
                        );
                    })}
                    {/* <Box>
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
                    </Box> */}
                </Stack>
            </Stack>
        </DefaultModal>
    );
};

export default TagModelExplore;
