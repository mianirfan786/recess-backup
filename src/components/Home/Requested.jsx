import {Box, Button, Container, IconButton, Stack, Typography,} from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai";
import {useModalsContext} from "../../modals/ModalsContext";
import {MODALS} from "../../modals/modals";
import {GetAllKeywordsFromUser} from "../../firebase/functions/user";
import {useEffect, useState} from "react";
import {ROUTES} from "../../routes";
import {useNavigate} from "react-router-dom";
import { GetKeywordsFromAllEvents } from "../../firebase/functions/event";

const Requested = ({updateKeywords}) => {
    const {setOpenModal} = useModalsContext();
    const [_activities, setActivities] = useState([]);
    const navigate = useNavigate()

    const setEventKeywords = async() => {
        const eventKeywords = await GetKeywordsFromAllEvents()
        GetAllKeywordsFromUser().then((data) => {
            let dt = {}
            let list = {};
            for (let i = 0; i < eventKeywords.length; i++) {
                const element = eventKeywords[i].toLowerCase();
                if(element in list){
                    list[element] += 1; 
                }else{
                    list[element] = 1;
                }
            }
            data.forEach(element => {
                const keyword = element.toLowerCase()
                if(keyword in list){
                    dt[keyword] = list[keyword]
                }
            });
            setActivities(dt);
        });
    }
    useEffect( () => {
       
       setEventKeywords()
        // setTimeout(() => {
        //     setEventKeywords()
        //     console.log("working");
        // }, 1000);
    }, [updateKeywords]);

    return (
        <Box sx={{bgcolor: "#F6FBF9"}}>
            <Container sx={{py: {xs: 2, md: 4}}}>
                <Stack gap={2}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography variant="h3" gutterBottom>
                                Activities Requested by You
                            </Typography>
                            <Typography variant="body1" sx={{fontSize: {xs: 14, md: 16}}}>
                                The activities below are in high demand.
                            </Typography>
                        </Box>
                        <Box sx={{transform: "rotate(-90deg)"}}>
                            <Button sx={{color: "text.primary"}} variant="text">
                                See all
                            </Button>
                        </Box>
                    </Stack>
                    <Stack flexDirection="row" flexWrap="wrap" gap={1}>
                        <IconButton
                            onClick={() => setOpenModal(MODALS.TAGS)}
                            sx={{backgroundColor: "white"}}
                        >
                            <AiOutlinePlus/>
                        </IconButton>
                        {Object.keys(_activities).length!==0 && Object.keys(_activities).map((data) => (
                            <Box
                                onClick={function (e) {
                                    e.preventDefault();
                                    navigate(ROUTES.EVENTS_PAGE + `?keywordSearch=${data}`);
                                }}
                                borderRadius="20px"
                                sx={{
                                    backgroundColor: "white",
                                    width: "content-box",
                                    cursor: "pointer",
                                }}
                                p="10px"
                                key={Math.random().toString(36).substring(2)}
                            >
                                {data} {_activities[data]>1?<span style={{marginLeft: "3px"}}>({_activities[data]})</span>:<></>}
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Requested;
