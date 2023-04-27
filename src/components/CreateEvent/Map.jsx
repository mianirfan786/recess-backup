import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useCreateEventContext} from "../../pages/CreateEvent";
import axios from "axios";
import { mapStyle } from "../Explore/MapView/mapStyle";

const CustomMap = ({height, loadUserLocation}) => {
    const [selected, setSelected] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayAddress, setDisplayAddress] = useState(null);

    const {address, setState} = useCreateEventContext();

    useEffect(() => {
        if (!selected) return;

        setLoading(true);

        const currentLat = selected.latLng.lat();
        const currentLng = selected.latLng.lng();

        const geocoder = new window.google.maps.Geocoder();


        fetch(
            "https://api.bigdatacloud.net/data/reverse-geocode-client?" +
            new URLSearchParams({
                latitude: selected.latLng.lat(),
                longitude: selected.latLng.lng(),
                localityLanguage: "en",
            }),
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((data) => setState((state) => ({...state, address: data})))
            .finally(() => setLoading(false));

        geocoder.geocode({ location: { lat: currentLat, lng: currentLng } }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    setDisplayAddress(results[0].formatted_address);
                    /* add display address to address */
                    setState((state) => ({...state, address: {...state.address, displayAddress: results[0].formatted_address}}));
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        } );

    }, [selected]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });

                if (loadUserLocation)
                    setSelected({
                        latLng: {
                            lat: () => position.coords.latitude,
                            lng: () => position.coords.longitude,
                        }
                    })

            },
            (error) => console.log("error")
        );
    }, []);


    return (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: height || "100vh",
                position: "relative",
            }}
            onClick={(e) => setSelected(e)}
            zoom={10}
            options={{styles: mapStyle}}
            center={userPosition}
        >
            {selected && (
                <Marker
                    position={{lat: selected.latLng.lat(), lng: selected.latLng.lng()}}
                    onClick={() => setSelected(null)}
                />
            )}

            {/* if not selected */}
            {userPosition && !selected && loadUserLocation && (
                <Marker
                    position={{lat: userPosition.lat, lng: userPosition.lng}}
                    onClick={() => setSelected(null)}
                />
            )}
            {loading && (
                <Stack
                    left="50%"
                    top="30%"
                    sx={{transform: "translateX(-50%)"}}
                    position="absolute"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress size={60}/>
                </Stack>
            )}
            {address && (
                <Stack
                    width="100%"
                    sx={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                    position="absolute"
                    p={2}
                    bottom={0}
                    gap={2}
                >
                    <Stack
                        sx={{
                            backgroundColor: "#FFFFFF",
                            width: "100%",
                            borderRadius: "15px",
                            padding: "12px",
                        }}
                    >
                        <Typography sx={{opacity: 0.5}} variant="body2">
                            Address
                        </Typography>
                        <Typography fontWeight={600} variant="body1">
                            {displayAddress || "N/A"}
                        </Typography>
                    </Stack>
                    <Stack flexDirection="row" gap={2}>
                        <Stack
                            sx={{
                                backgroundColor: "#FFFFFF",
                                width: "100%",
                                borderRadius: "15px",
                                padding: "12px",
                            }}
                        >
                            <Typography sx={{opacity: 0.5}} variant="body2">
                                City
                            </Typography>
                            <Typography fontWeight={600} variant="body1">
                                {address.city || "N/A"}
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                backgroundColor: "#FFFFFF",
                                width: "100%",
                                borderRadius: "15px",
                                padding: "12px",
                            }}
                        >
                            <Typography sx={{opacity: 0.5}} variant="body2">
                                State
                            </Typography>
                            <Typography fontWeight={600} variant="body1">
                                {address.principalSubdivision}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack flexDirection="row" gap={2}>
                        <Stack
                            sx={{
                                backgroundColor: "#FFFFFF",
                                width: "100%",
                                borderRadius: "15px",
                                padding: "12px",
                            }}
                        >
                            <Typography sx={{opacity: 0.5}} variant="body2">
                                Latitude
                            </Typography>
                            <Typography fontWeight={600} variant="body1">
                                {address.latitude?.toFixed(2)}
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                backgroundColor: "#FFFFFF",
                                width: "100%",
                                borderRadius: "15px",
                                padding: "12px",
                            }}
                        >
                            <Typography sx={{opacity: 0.5}} variant="body2">
                                Longitude
                            </Typography>
                            <Typography fontWeight={600} variant="body1">
                                {address.longitude?.toFixed(2)}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </GoogleMap>
    );
};

const Map = (props) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });


    /* get user latitude and longitude */
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();

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
            <Box width="100%">
                <CustomMap height="600px" loadUserLocation={props.loadUserLocation}/>
            </Box>
        );
    }
};

export default Map;


