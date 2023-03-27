import {GoogleMap, InfoWindow, MarkerF} from "@react-google-maps/api";
import {useEffect, useState} from "react";
import location from "../../../images/location.png";
import {ROUTES} from "../../../routes";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const mapContainerStyle = {
    width: "100%",
};

const Map = ({center, events, height, onUserLocationChange}) => {
    const [selected, setSelected] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    let isEventsArray = false;
    const navigate = useNavigate()
    /* convert events to array of an object */
    /* check if events is an array */
    if (events && !Array.isArray(events)) {
        center = {
            lat: events?.latitude,
            lng: events?.longitude,
        }
    } else {
        center = {
            lat: events[0]?.latitude,
            lng: events[0]?.longitude,
        }
        isEventsArray = true;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.log(error)
        );
    }, []);

    useEffect(() => {
        if (isEventsArray) {
            onUserLocationChange(userPosition);
        }
    } , [userPosition]);

    return (
        <GoogleMap
            mapContainerStyle={{...mapContainerStyle, height: height || "100vh"}}
            zoom={10}
            center={center}
            onClick={(e) => {
                setSelected(null);
                /* set userPosition where i have clicked */
                if(isEventsArray){
                    setUserPosition({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                    });
                }
            }}
        >
            {/* Show markers for each location in the markers array */}
            {events && isEventsArray && events.map((event) => (
                <MarkerF
                    title={event?.title}
                    icon={event?.photos}
                    key={event?.id}
                    position={{lat: event?.latitude, lng: event?.longitude}}
                    onClick={() => {
                        setSelected(event);
                    }}
                />
            ))}
            {events && !isEventsArray && (
                <MarkerF
                    position={{lat: events?.latitude, lng: events?.longitude}}
                    icon={events?.photos}
                    onClick={() => {
                        setSelected(events);
                    }}
                />
            )}

            {/* Show a marker for the user's current position */}
            {userPosition && <MarkerF position={userPosition} icon={location}/>}


            {selected ? (
                <InfoWindow
                    position={{lat: selected.latitude, lng: selected.longitude}}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                >
                    <div>
                        <h2>{selected.title}</h2>
                        <p
                            style={{
                                marginTop: "10px",
                            }}
                        >Custom information about this marker</p>
                        <Button
                            onClick={function (e) {
                                e.preventDefault();
                                navigate(ROUTES.EVENT_DETAILS.replace(":id", selected.id));
                            }}
                            sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: 50,
                                fontSize: {xs: 14, md: 16},
                                fontWeight: 700,
                                textTransform: "capitalize",
                                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
                                color: "text.primary",
                                boxShadow: 0,
                                "&:hover": {
                                    backgroundColor: "primary.main",
                                    color: "info.main",
                                    boxShadow: 0,
                                },
                            }}
                            style={{
                                backgroundColor: "info.main",
                                color: "text.primary",
                                marginBlock: "auto",
                                marginTop: "10px",
                            }}
                            variant="contained"
                            color="info"
                        >
                            Join
                        </Button>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
    );
};

export default Map;
