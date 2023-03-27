import {Box, CircularProgress} from "@mui/material";
import {useLoadScript} from "@react-google-maps/api";
import marker1 from "../../../images/marker-1.png";
import marker2 from "../../../images/marker-2.png";
import marker3 from "../../../images/marker-3.png";
import marker4 from "../../../images/marker-4.png";
import marker5 from "../../../images/marker-5.png";
import Map from "./Map";
import {GOOGLE_MAPS_API_KEY} from "../../GoogleAutocomplete";
import {useState} from "react";

const MapView = ({markers, height, events, setUserLocation}) => {
    const [center, setCenter] = useState({});
    if (events)
        markers = events
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

    const onUserLocationChange = (location) => {
        setUserLocation(location);
    }

    if (loadError) return "Error loading maps";
    if (!isLoaded) {
        return (
            <Box sx={{py: 2, textAlign: "center"}}>
                <CircularProgress/>
            </Box>
        );
    }
    if (isLoaded && !loadError) {
        return (
            <div>
                <Map onUserLocationChange={onUserLocationChange} center={center} events={markers} height={height}/>
            </div>
        );
    }
};

export default MapView;
