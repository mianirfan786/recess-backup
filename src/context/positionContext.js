import React, {useEffect, useState} from "react";

const PositionContext = React.createContext();

export const PositionProvider = ({children}) => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        if (!position) return;

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
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.log(error)
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
