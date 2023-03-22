import {useNavigate} from "react-router-dom";
import {Button, IconButton, Stack, Typography} from "@mui/material";
import StyledTextInput from "../components/StyledTextInput";
import BackButton from "../icons/BackIcon";
import FormContainer from "../components/FormContainer";
import ResetPasswordIcon from "../icons/ResetPassword";
import {useState} from "react";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [{password, newPassword}, setState] = useState({
        password: "",
        newPassword: "",
    });

    return (
        <FormContainer>
            <Stack
                position="relative"
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <IconButton
                    sx={{
                        left: 0,
                        position: "absolute",
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                    }}
                    onClick={() => navigate(-1)}
                >
                    <BackButton/>
                </IconButton>
                <Typography variant="h4">Reset password</Typography>
            </Stack>
            <Stack sx={{marginTop: 5}} gap={2}>
                <StyledTextInput
                    type="password"
                    required
                    value={password}
                    onChange={(e) =>
                        setState((prev) => ({...prev, password: e.target.value}))
                    }
                    InputProps={{
                        endAdornment: (
                            <Stack
                                alignItems="center"
                                justifyContent="center"
                                sx={{opacity: 0.3}}
                            >
                                <ResetPasswordIcon/>
                            </Stack>
                        ),
                    }}
                    label="Old password"
                    variant="filled"
                />
                <StyledTextInput
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) =>
                        setState((prev) => ({...prev, newPassword: e.target.value}))
                    }
                    InputProps={{
                        endAdornment: (
                            <Stack
                                alignItems="center"
                                justifyContent="center"
                                sx={{opacity: 0.3}}
                            >
                                <ResetPasswordIcon/>
                            </Stack>
                        ),
                    }}
                    label="New password"
                    variant="filled"
                />
                <Button
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
                    Reset Password
                </Button>
            </Stack>
        </FormContainer>
    );
};

export default ResetPassword;
