import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContinueWithSocialMedia from "../components/ContinueWithSocialMedia";
import FormContainer from "../components/FormContainer";
import StyledTextInput from "../components/StyledTextInput";
import useSignUp from "../hooks/useSignUp";
import BackButton from "../icons/BackIcon";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <BackButton />
      </span>
      <Typography fontSize="20px" textAlign="center" sx={{ width: "90%" }}>
        Sign up
      </Typography>
    </Stack>
  );
};

const SignUpForm = ({ inputs, formData, handleOnChange }) => (
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
    <FormControlLabel
      control={
        <Checkbox
          color="default"
          checked={formData.termAndConditions}
          onChange={handleOnChange}
          name="termAndConditions"
        />
      }
      sx={{ display: "flex", alignItems: "center" }}
      label="I agree to Recess Terms of service and Privacy Policy."
    />
  </Stack>
);

const SignUp = () => {
  const { inputs, formData, handleOnChange, handleSubmit } = useSignUp();
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
          Create your account
        </Typography>
        <SignUpForm {...{ inputs, formData, handleOnChange }} />
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
          Sign up
        </Button>
      </Stack>
      <ContinueWithSocialMedia sx={{ marginTop: 5, textAlign: "center" }} />
    </FormContainer>
  );
};

export default SignUp;
