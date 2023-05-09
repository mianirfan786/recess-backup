import {Container} from "@mui/material";
import GoogleAutocomplete from "../GoogleAutocomplete";
import {Stack} from "@mui/system";
import LocationIcon from "../../icons/LocationIcon";
import {useState} from "react";
import LocationHook from "../../hooks/useLocationHook";

const Location = ({onData}) => {
    const {setCurrentLocationPoints} = LocationHook()

    const [shouldReset, setShouldReset] = useState(false);
    const resetGoogleAutocomplete = () => {
        setCurrentLocationPoints()

        setShouldReset(true);
        setTimeout(() => {
            setShouldReset(false);
        }, 500);
    }
    const HandleLocationChange = async (event) => {
        const city = event.structured_formatting.main_text;
        onData(city);
    }
    return (
        <Container>
            <Stack
                height="100%"
                p={1}
                borderRadius="20px"
                flexDirection="row"
                alignItems="center"
                gap={2}
                sx={{backgroundColor: "white"}}
            >
                <Stack
                    onClick={() => {
                        resetGoogleAutocomplete();
                    }}  
                    p={1.25}
                    height="100%"
                    borderRadius="12px"
                    alignItems="center"
                    justifyContent="center"
                    sx={{backgroundColor: "#ECF5F2", cursor: "pointer"}}
                >
                    <LocationIcon/>
                </Stack>
                <GoogleAutocomplete onReset={shouldReset} onChange={HandleLocationChange}/>
            </Stack>
        </Container>
    );
};

export default Location;
