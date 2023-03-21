import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
    IconButton,
} from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai";
import {useModalsContext} from "../../modals/ModalsContext";
import {MODALS} from "../../modals/modals";
import {GetAllKeywordsFromUser} from "../../firebase/functions/user";
import {useEffect, useState} from "react";

const Requested = ({updateKeywords}) => {
    const {setOpenModal} = useModalsContext();
    const [_activities, setActivities] = useState([]);
    useEffect(() => {
        GetAllKeywordsFromUser().then((data) => {
            setActivities(data);
        });
        setTimeout(() => {
            GetAllKeywordsFromUser().then((data) => {
                setActivities(data);
            });
        }, 1000);
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
                        {_activities.map((data) => (
                            <Box
                                borderRadius="20px"
                                sx={{
                                    backgroundColor: "white",
                                    width: "content-box",
                                    cursor: "pointer",
                                }}
                                p="10px"
                                key={Math.random().toString(36).substring(2)}
                            >
                                {data}
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Requested;
