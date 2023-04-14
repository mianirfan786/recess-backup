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

const autocompleteService = {current: null};

export default function GoogleAutocomplete({onChange, onReset}) {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [touched, setTouched] = React.useState(false);
    const loaded = React.useRef(false);
    const [initLocation, setInitLocation] = useState(null);

    const {address} = usePositionContext();
    useEffect(() => {
        console.log(address);
        if(address)
        {
            getUserLocationCity().then((userAddress)=>{
                console.log(userAddress);
                let city = userAddress.split(",")[0]       
                let state = address.principalSubdivisionCode.split("-")[1]
                setValue({
                    description: `${city}, ${state}`,
                    structured_formatting: {
                        main_text: city,
                        secondary_text: `${state}`,
                    },
                });
                
             })
        }
     

        // if (address) {
        //     if (initLocation !== null)
        //         setInitLocation(address);
        //     setValue({
        //         description: `${address.city}, ${address.principalSubdivision}`,
        //         structured_formatting: {
        //             main_text: address.city,
        //             secondary_text: `${address.principalSubdivision}`,
        //         },
        //     });
        // }
    }, [address, onReset]);

    useEffect(() => {
        if (value) {
            onChange(value);
        }
    }, [value]);

    if (typeof window !== "undefined" && !loaded.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
                document.querySelector("head"),
                "google-maps"
            );
        }

        loaded.current = true;
    }
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
    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(
                    {...request, componentRestrictions: {country: "us"}},
                    callback
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
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({input: inputValue}, (results) => {
            const newResults = []
            for(let i = 0; i < results.length; i++) {
                results[i].description = results[i].description.replace(/, USA/g, "");
                results[i].structured_formatting.secondary_text = results[i].structured_formatting.secondary_text.replace(/, USA/g, "");
                newResults.push(results[i]);
            }

            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (newResults) {
                    newOptions = [...newOptions, ...newResults];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);


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
            onClick={() => {
                if (!touched) {
                    setTouched(true);
                }
            }}
            value={value}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                /* remove everythin after the last occorance of , */
                newValue.description = newValue.description.split(",").slice(0, 2).join(",");
                setValue(newValue);
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
