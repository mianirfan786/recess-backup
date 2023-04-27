import DefaultModal from "./DefaultModal";
import {Button, Checkbox, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import PeopleIcon from "../icons/PeopleIcon";
import PersonIcon from "../icons/PersonIcon";
import DateCreatedIcon from "../icons/DateCreatedIcon";
import StartDateIcon from "../icons/StartDateIcon";
import PlayerIcon from "../icons/PlayerIcon";
import CheckIcon from "../icons/CheckIcon";
import { setAppliedFilter } from "../store/ModelSlice";
import {useDispatch} from "react-redux"

const sortOptions = [
    {name: "No of Attendees", icon: PeopleIcon()},
    {name: "No of Registered", icon: PersonIcon()},
    {name: "Date Created", icon: DateCreatedIcon()},
    {name: "Start Date", icon: StartDateIcon()},
    {name: "Max No of Players", icon: PlayerIcon()},
];

const priceRange = [0, 1, 2, 3];

const SortAndFilterModal = ({open, onClose, onApply}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        selectedSortOption: null,
        priceRange: null,
        sponsoredListings: false,
    });

    const onApplyClick = () => {
        onApply(state);    
        let i=0;        
        Object.values(state).map((item)=>{
                if(item===null || item===false){
                }
                else{
                    i++;

                }
            })
            dispatch(setAppliedFilter(i))
        onClose();
    };

    const onOptionClick = (option) => {
        setState((prev) => ({
            ...prev,
            selectedSortOption: option === state.selectedSortOption ? null : option,
        }));
    };

    const onListingsChange = (e) => {
        setState((prev) => ({...prev, sponsoredListings: e.target.checked}));
    };

    const onPriceRangeChange = (price) => {
        setState((prev) => ({
            ...prev,
            priceRange: price === state.priceRange ? null : price,
        }));
    };

    return (
        <DefaultModal open={open} onClose={onClose}>
            <Stack textAlign="center" gap={3}>
                <Typography variant="h4">Sort & Filters</Typography>
                <Stack gap={2}>
                    <Typography textAlign="start" variant="h5">
                        Sort
                    </Typography>
                    <Stack gap="2px">
                        {sortOptions.map((option) => {
                            const {name, icon} = option;

                            const active = state.selectedSortOption?.name === name;

                            return (
                                <Stack
                                    key={name}
                                    p="4px"
                                    onClick={() => onOptionClick(option)}
                                    sx={{
                                        cursor: "pointer",
                                        borderRadius: "10px",
                                        border: active
                                            ? "1px solid #2DC6FF"
                                            : "1px solid transparent",
                                    }}
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Stack gap={1} flexDirection="row" alignItems="center">
                                        {icon}
                                        <Typography variant="body1">{name}</Typography>
                                    </Stack>
                                    {active && <CheckIcon/>}
                                </Stack>
                            );
                        })}
                    </Stack>
                </Stack>
                <Stack gap={2}>
                    <Typography textAlign="start" variant="h5">
                        Price Range
                    </Typography>
                    <Stack flexDirection="row" alignItems="center" gap={1}>
                        {priceRange.map((price) => {
                            const active = state.priceRange === price;

                            return (
                                <Stack
                                    key={price}
                                    onClick={() => onPriceRangeChange(price)}
                                    p={3}
                                    sx={{
                                        cursor: "pointer",
                                        minWidth: {xs: "60px", sm: "80px"},
                                        width: {xs: "60px", sm: "80px"},
                                        color: active ? "white" : "black",
                                        borderRadius: "20px",
                                        aspectRatio: "1/1",
                                        fontWeight: active ? "bold" : "normal",
                                        backgroundColor: active ? "#2DC6FF" : "#F6FBF9",
                                        border: active ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {price === 0
                                        ? "Free"
                                        : `${[...Array(price)].map(() => "$").join("")}`}
                                </Stack>
                            );
                        })}
                    </Stack>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Checkbox
                        checked={state.sponsoredListings}
                        onChange={onListingsChange}
                    />
                    <Typography variant="body1">
                        Display only Sponsored Listings
                    </Typography>
                </Stack>
                <Button
                    onClick={onApplyClick}
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#000",
                        color: "info.main",
                        borderRadius: 8,
                        padding: 1,
                        "&:hover": {
                            backgroundColor: "#000",
                        },
                    }}
                >
                    Apply
                </Button>
            </Stack>
        </DefaultModal>
    );
};

export default SortAndFilterModal;
