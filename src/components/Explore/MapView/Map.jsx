import {GoogleMap, InfoWindow, MarkerF} from "@react-google-maps/api";
import {useEffect, useState} from "react";
import location from "../../../images/location.png";

const mapContainerStyle = {
    width: "100%",
};

const Map = ({center, events, height}) => {
    const [selected, setSelected] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    /* convert events to array of an object */
    center = {
        lat: events?.latitude,
        lng: events?.longitude,
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

    return (
        <GoogleMap
            mapContainerStyle={{...mapContainerStyle, height: height || "100vh"}}
            zoom={10}
            center={center}
        >
            {/* Show a marker for the user's current position */}
            {userPosition && <MarkerF position={userPosition} icon={location}/>}

            {/* Show markers for each location in the markers array */}
            <MarkerF
                position={{lat: events?.latitude, lng: events?.longitude}}
                icon={events?.icon}
                onClick={() => {
                    setSelected(events);
                }}
            />

            {selected ? (
                <InfoWindow
                    position={{lat: selected.lat, lng: selected.lng}}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                >
                    <div>
                        <h2>{selected.label}</h2>
                        <p>Custom information about this marker</p>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
    );
};

export default Map;
