import { Link as RouterLink, useNavigate } from "react-router-dom";

// mui imports
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ContinueWithSocialMedia from "../components/ContinueWithSocialMedia";
import FormContainer from "../components/FormContainer";
import StyledTextInput from "../components/StyledTextInput";
import useSignIn from "../hooks/useSignIn";
import Logo from "../icons/Logo";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <Logo />
      </span>
      <Button
        component={RouterLink}
        to="/sign-up"
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

const Login = () => {
  const { inputs, formData, handleOnChange, handleSubmit } = useSignIn();
  const navigate = useNavigate();
  const handleOnSubmit = () => {
    navigate("/home");
  };

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
          onClick={handleOnSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "info.main",
            borderRadius: 8,
            padding: 2,
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          Log In
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

export default Login;
