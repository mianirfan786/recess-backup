import {Box, Button, Stack, Switch, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import StyledTextInput from "../components/StyledTextInput";
import useForgotPassword from "../hooks/useForgotPassword";
import BackButton from "../icons/BackIcon";
import {useState} from "react";
import phoneIcon from "../images/phone-icon.svg";
import phone from "../images/blackphone.svg";
import emailIcon from "../images/email-icon.svg";
import email from "../images/blackmessage.svg";
import styled from "@emotion/styled";

const StyledSwitch = styled(Switch)({
    width: 80,
    height: 52,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 9,
        padding: 0,
        transform: "translateX(4px)",
        "& + .MuiSwitch-track": {
            borderRadius: "40px",
            border: " 1px solid #DFE0E6",
            opacity: 1,
            backgroundColor: "white !important",
        },
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(27px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('${phoneIcon}')})`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "white",
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor: "#001e3c",
            width: 32,
            height: 32,
            "&:before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('${emailIcon}')})`,
            },
        },
    },
});


const Header = () => {
    const navigate = useNavigate();
    return (
        <Stack
            direction="row"
            justifyContent="center"
            position="relative"
            alignItems="center"
        >
            <Box
                position="absolute"
                left={0}
                onClick={() => navigate(-1)}
                style={{cursor: "pointer"}}
            >
                <BackButton/>
            </Box>
            <Typography fontWeight="bold" fontSize="20px" textAlign="center">
                Forgot Password
            </Typography>
        </Stack>
    );
};

const ForgotPassword = () => {
    const {inputs, formData, handleOnChange, handleSubmit} =
        useForgotPassword();

    const [inputType, setInputType] = useState(0);

    return (
        <FormContainer>
            <Header/>
            <Stack sx={{marginTop: 5}} gap={3}>
                <Typography
                    align="center"
                    sx={{
                        fontSize: "22px",
                        lineHeight: "31px",
                        fontWeight: "400",
                        fontStyle: "normal",
                    }}
                >
                    Enter your registered email or phone number
                </Typography>
                <Stack alignItems="center">
                    <StyledSwitch
                        checked={!!inputType}
                        onChange={() => setInputType((prev) => (!!prev ? 0 : 1))}
                    />
                </Stack>
                <StyledTextInput
                    variant="filled"
                    {...inputs[inputType]}
                    value={formData[inputs[inputType].name]}
                    onChange={handleOnChange}
                />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        borderRadius: 8,
                        padding: 2,
                        "&:hover": {
                            backgroundColor: "#000",
                        },
                    }}
                >
                    Send Reset
                </Button>
            </Stack>
        </FormContainer>
    );
};

export default ForgotPassword;
