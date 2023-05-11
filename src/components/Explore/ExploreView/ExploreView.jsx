import {Box, Button, Container, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {BsGrid} from "react-icons/bs";
import ExploreFilter from "../ExploreHeader/ExploreFilter";
import ListView from "../ListView/ListView";
import MapView from "../MapView/MapView";
import {MODALS} from "../../../modals/modals";
import evenUser1 from "../../../images/even-user-1.png";
import evenUser2 from "../../../images/even-user-2.png";
import evenUser3 from "../../../images/even-user-3.png";
import frisbee4 from "../../../images/firsbee-4.png";
import frisbee2 from "../../../images/frisbee-2.png";
import frisbee3 from "../../../images/frisbee-3.png";
import glof from "../../../images/glof.png";
import LocationIcon from "../../../icons/LocationIcon";
import GoogleAutocomplete from "../../GoogleAutocomplete";
import {GetExploreEvents, GetExploreEventsFromUserLocation} from "../../../firebase/functions/event/sort-event";
import { useModalsContext } from "../../../modals/ModalsContext";
import { useSelector, useDispatch } from "react-redux"
import { setOpenTagModel } from "../../../store/ModelSlice";
import LocationHook from "../../../hooks/useLocationHook";



const events = [{
    id: 1,
    title: "Ultimate Golf",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: glof,
    eventJoined: [{id: 1, image: evenUser1}, {id: 2, image: evenUser2}, {id: 3, image: evenUser3},],
}, {
    id: 2,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: frisbee2,
    eventJoined: [{id: 1, image: evenUser1}, {id: 2, image: evenUser2}, {id: 3, image: evenUser3},],
}, {
    id: 3,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: frisbee3,
    eventJoined: [{id: 1, image: evenUser1}, {id: 2, image: evenUser2}, {id: 3, image: evenUser3},],
}, {
    id: 4,
    title: "Ultimate Frisbee",
    location: "Central City Park",
    date: "25 Jun, 2022",
    time: "10:00 am",
    image: frisbee4,
    eventJoined: [{id: 1, image: evenUser1}, {id: 2, image: evenUser2}, {id: 3, image: evenUser3},],
},];

const ExploreView = ({filters}) => {
    const dispatch = useDispatch()
    const location = useSelector(state=> state.LocationReducer.location)
    const positionPoints = useSelector(state=> state.LocationReducer.positionPoints)
    const tags = useSelector( state => state.ModelReducer.tags )
    const {setCurrentLocationPoints} = LocationHook()

    const [view, setView] = useState("list");
    const [events, setEvents] = useState(null);
    const [city, setCity] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [shouldReset, setShouldReset] = useState(false);
    const handleView = (view) => {
        setView(view);
    };
    const resetGoogleAutocomplete = () => {
        setCurrentLocationPoints()
        setShouldReset(true);
        setTimeout(() => {
            setShouldReset(false);
        }, 500);
    }

    useEffect(() => {
        if (view === "list" ) {
            if(location.structured_formatting.main_text!==""){
                GetExploreEvents(20, filters, location.structured_formatting.main_text, tags).then((events) => {
                    setEvents(events);
                });
            }
            
        } else {
             GetExploreEventsFromUserLocation(20, filters, positionPoints.lat, positionPoints.lng, tags).then((data) => {
                        setEvents(data);
                    });
                }
    },[view, filters, location,tags]);

    // const updateLocation = (location) => {
    //     setUserLocation(location);
    // }


    return (<Box className="borders" sx={{bgcolor: "info.main", pt: {xs: 2, md: 4}}}>
        <Container>
            {view === "list" && (<Stack
                mb={{xs: 2, md: 4}}
                height="100%"
                p={1}
                borderRadius="20px"
                flexDirection="row"
                alignItems="center"
                gap={1}
                sx={{backgroundColor: "#ECF5F2"}}
            >
                <Stack
                    onClick={resetGoogleAutocomplete}
                    p={2}
                    height="100%"
                    borderRadius="15px"
                    alignItems="center"
                    justifyContent="center"
                    sx={{backgroundColor: "white", cursor:"pointer"}}
                >
                    <LocationIcon  />
                </Stack>
                <GoogleAutocomplete onReset={shouldReset}  onChange={(e) => setCity(e.structured_formatting.main_text)}/>
            </Stack>)}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
            >
                <Button
                    sx={{
                        borderRadius: 8, py: 1, px: 3, borderColor: tags.length?"#2DC6FF":"#CED1DC80", color: "text.secondary",
                    }}
                    startIcon={<BsGrid/>}
                    variant="outlined"
                    onClick={()=>dispatch(setOpenTagModel(true))}
                >
                    Tags {
                        tags.length?`(${tags.length})`:""
                    }
                </Button>
                <ExploreFilter
                    view={view}
                    setView={setView}
                    handleView={handleView}
                />
            </Stack>
        </Container>

        {/* show based on view */}
        <Box sx={{pt: {xs: 2, md: 4}, pb: 0}}>
            {view === "list" ? (<ListView events={events}/>) : (<MapView   filters={filters} events={events}/>)}
        </Box>
    </Box>);
};

export default ExploreView;
