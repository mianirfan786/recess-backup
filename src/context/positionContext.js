import React, {useEffect, useState} from "react";

const PositionContext = React.createContext();

export const PositionProvider = ({children}) => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState(null);
console.log({address});
    useEffect(() => {
        if (!position) return;
        console.log(position);

        fetch(
            "https://api.bigdatacloud.net/data/reverse-geocode-client?" +
            new URLSearchParams({
                latitude: position.lat,
                longitude: position.lng,
                localityLanguage: "en",
            }),
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((data) => setAddress(data));

            
    }, [position]);

    useEffect(() => {
        fetch(
            `https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places` ,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log({data});
            });
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.log("error",error)
        );
    }, []);

    return (
        <PositionContext.Provider value={{address}}>
            {children}
        </PositionContext.Provider>
    );
};

export const usePositionContext = () => {
    const context = React.useContext(PositionContext);
    if (context === undefined) {
        throw new Error(
            "usePositionContext must be used within a PositionProvider"
        );
    }
    return context;
};
