import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setplaceID, setPositionPoints } from "../store/LocationSlice";


const LocationHook = () => {
    const dispatch = useDispatch()
    const [points, setPoints] = useState({})

    const setCurrentLocationPoints = ()=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPoints ({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                dispatch(setPositionPoints({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }))
                dispatch(setplaceID(""))

                getLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })

    }
    )
   
}
    const getLocation = (points=points) => {
        if (!points) return;
        const currentLat = points.lat;
        const currentLng = points.lng;
        
        
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location:{lat:currentLat, lng:currentLng} }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    const stateCode = results[0].address_components.find(component => component.types.includes("administrative_area_level_1")).short_name;
                      const cityCode = results[0].address_components.find(component => component.types.includes("locality")).short_name;
                dispatch(setPositionPoints({
                    lat:currentLat,
                    lng: currentLng
                }))
                      dispatch(setLocation({
                        description: `${cityCode}, ${stateCode}`,
                        structured_formatting: {
                            main_text: cityCode,
                            secondary_text: `${stateCode}`,
                        }
                    }))
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        } );
        

    }
    return{
        getLocation,
        setPoints,
        setCurrentLocationPoints,
    }
}

export default LocationHook