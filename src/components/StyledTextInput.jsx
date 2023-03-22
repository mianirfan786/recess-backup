import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";

const StyledTextInput = styled(TextField)(() => ({
    // need to add padding just to the mui input field
    // so that the label doesn't get cut off
    "& .MuiFilledInput-root": {
        paddingLeft: 15,
    },
    "& .Mui-focused": {
        backgroundColor: "#fff!important",
        color: "#CED1DC!important",
    },
    "& *, & input, & label, .MuiInputBase-adornedEnd, .MuiInputBase-adornedEnd:hover":
        {
            backgroundColor: "#fff",
        },
    "& label": {
        color: "#CED1DC",
        marginLeft: 10,
    },
    "& .MuiInputBase-root": {
        borderRadius: 12,
    },
    "& .MuiInputBase-root::before, & .MuiInputBase-root::after": {
        display: "none",
    },
    "& .MuiFilledInput-input": {
        borderRadius: 12,
        color: "#000",
    },

    //   Make the required astric red
    //   "& .MuiFormLabel-asterisk": {
    //     color: "red",
    //   },
}));

export default StyledTextInput;
