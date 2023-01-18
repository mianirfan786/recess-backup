import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// mui imports
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";

import ContinueWithSocialMedia from "../components/ContinueWithSocialMedia";
import Logo from "../icons/Logo";
import StyledTextInput from "../components/StyledTextInput";
import FormContainer from "../components/FormContainer";
import useSignIn from "../hooks/useSignIn";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span onClick={() => navigate("/")}>
        <Logo />
      </span>
      <Button
        component={RouterLink}
        to="/signup"
        variant="outlined"
        sx={{ borderRadius: 8, borderColor: "#CED1DC" }}
        color="inherit"
      >
        Sign up
      </Button>
    </Stack>
  );
};

const SignInForm = ({ inputs, formData, handleOnChange }) => (
  <Stack spacing={2}>
    {inputs.map((inputProps, index) => (
      <StyledTextInput
        variant="filled"
        {...inputProps}
        key={index}
        value={formData[inputProps.name]}
        onChange={handleOnChange}
      />
    ))}
    <Stack direction="row" justifyContent="space-around" alignItems="center">
      <FormControlLabel
        control={
          <Checkbox
            color="default"
            checked={formData.rememberMe}
            onChange={handleOnChange}
            name="rememberMe"
          />
        }
        label="Remember Me"
      />
      <Link
        component={RouterLink}
        to="/forgot-password"
        color="inherit"
        underline="hover"
      >
        Forgot password?
      </Link>
    </Stack>
  </Stack>
);

const SignIn = () => {
  const { inputs, formData, handleOnChange, handleSubmit } = useSignIn();

  return (
    <FormContainer>
      <Header />
      <Stack sx={{ marginTop: 8 }} spacing={5}>
        <Typography
          align="center"
          sx={{
            fontSize: "22px",
            lineHeight: "31px",
            fontWeight: "400",
            fontStyle: "normal",
          }}
        >
          Enter your email & choose you password
        </Typography>
        <SignInForm {...{ inputs, formData, handleOnChange }} />
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#000",
            borderRadius: 8,
            padding: 2,
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          Sign In
        </Button>
      </Stack>
      <ContinueWithSocialMedia
        sx={{ marginTop: 5, marginBottom: 8, textAlign: "center" }}
      />
      <Typography textAlign="center">
        New to Today?{" "}
        <Link component={RouterLink} to="/signup" underline="hover">
          Sign up
        </Link>
      </Typography>
    </FormContainer>
  );
};

export default SignIn;
