import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import {usePositionContext} from "../context/positionContext";
import "../styles/location.scss"
import { getUserLocationCity } from "../firebase/functions/event";
import LocationHook from "../hooks/useLocationHook";
import { useDispatch, useSelector } from "react-redux";
import { setLoaded, setLocation, setPositionPoints,setPlaceID, setplaceID } from "../store/LocationSlice";
import { GetCurrentUserDetails } from "../firebase/functions/user";
import { setUserInfo } from "../store/UserSlice";

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}
const serviceOptions = {
    // componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
   };

const autocompleteService = {current: null};
const geocoder = new window.google.maps.Geocoder();

export default function GoogleAutocomplete({onChange, onReset}) {
    const location = useSelector(state => state.LocationReducer.location)
    const placeID = useSelector(state => state.LocationReducer.placeID)
    const loaded = useSelector(state => state.LocationReducer.loaded)
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [touched, setTouched] = React.useState(false);
    const [initLocation, setInitLocation] = useState(null);
    const {setPoints,setCurrentLocationPoints} = LocationHook()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(loaded){
            setCurrentLocationPoints()
            GetCurrentUserDetails().then((data) => {
                dispatch(setUserInfo(data))
            })
        }
        dispatch(setLoaded(false))
    },[loaded])

    const {address} = usePositionContext();
    
    useEffect(() => {
        if (location) {
            onChange(location);
        }
    }, [location]);

    const styles = {
        input: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        },
        div: {
            '& .label+.css-1dejl2x-MuiInputBase-root-MuiInput-root':{
                marginTop: "14px",
            },
        },
      }
    const onFetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(
                    {...request,componentRestrictions: {country: "us"}},
                    callback,
                );
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions(location ? [location] : []);
            return undefined;
        }
        onFetch({input: inputValue}, async (results) => {
            const newResults = []
            for(let i = 0; i < results.length; i++) {
                results[i].description = results[i].description.replace(/, USA/g, "");
                results[i].structured_formatting.secondary_text = results[i].structured_formatting.secondary_text.replace(/, USA/g, "");
                newResults.push(results[i]);
            }
          
            if (active) {
                let newOptions = [];

                // if (location) {
                //     newOptions = [location];
                // }

                if (newResults) {
                    newOptions = [...newOptions, ...newResults];
                }
                setOptions(newOptions);
            }
            
           
        });

        return () => {
            active = false;
        };
    }, [inputValue, onFetch]);

    useEffect(()=>{
        const onPlaceID = async ()=>{        
            if(placeID!=="")
           { await geocoder.geocode({ placeId: placeID,  }, (results_geo, status) => {
                if (status === "OK") {
                    const result = results_geo[0];
                    const { lat, lng } = result.geometry.location;
                    const stateCode = result.address_components.find(component => component.types.includes("administrative_area_level_1")).short_name;
                    const cityCode = result.address_components.find(component => component.types.includes("locality")).short_name;  

                    const latitude = lat();
                    const longitude = lng()
                      dispatch(setLocation({
                        description: `${cityCode}, ${stateCode}`,
                        structured_formatting: {
                            main_text: cityCode,
                            secondary_text: stateCode,
                        }
                    }))
                    
                    dispatch(setPositionPoints({
                        lat: latitude,
                        lng: longitude,
                      }))
                    setPoints({
                      lat: latitude,
                      lng: longitude,
                    })
                    setOptions([])

                } else {
                  console.error(`Geocoding failed: ${status}`);
                }
              });}
        }
        onPlaceID()
    },[placeID])

    return (
        <Autocomplete
            fullWidth
            getOptionLabel={(option) =>
                typeof option === "string" ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            includeInputInList
            filterSelectedOptions
            fetchDetails={true}
            onClick={() => {
                if (!touched) {
                    setTouched(true);
                }
            }}
            isOptionEqualToValue={(option, value) =>
                option.description === value.description &&
                option.structured_formatting.main_text ===
                  value.structured_formatting.main_text &&
                option.structured_formatting.secondary_text ===
                  value.structured_formatting.secondary_text
              }
            value={location}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                /* remove everythin after the last occorance of , */
                dispatch(setplaceID(newValue.place_id))
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField name="address"  InputProps={{style: styles}}  variant="standard" {...params} label="Location" fullWidth/>
            )}
            renderOption={(props, option) => {
                const matches =
                    option?.structured_formatting?.main_text_matched_substrings ?? [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches?.map((match) => [match.offset, match.offset + match.length])
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Box
                                    component={LocationOnIcon}
                                    sx={{color: "text.secondary", mr: 2}}
                                />
                            </Grid>
                            <Grid item xs>
                                {parts.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontWeight: part.highlight ? 700 : 400,
                                        }}
                                    >
                    {part.text}
                  </span>
                                ))}

                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}
