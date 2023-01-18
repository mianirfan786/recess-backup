import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import StyledTextInput from "../components/StyledTextInput";
import useForgotPassword from "../hooks/useForgotPassword";
import BackButton from "../icons/BackIcon";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span onClick={() => navigate(-1)}>
        <BackButton />
      </span>
      <Typography fontSize="20px" textAlign="center" sx={{ width: "90%" }}>
        Forgot Password
      </Typography>
    </Stack>
  );
};

const ForgotPassword = () => {
  const { inputs, formData, handleOnChange, handleSubmit } =
    useForgotPassword();

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
          Enter your registered email
        </Typography>
        {inputs.map((inputProps, index) => (
          <StyledTextInput
            variant="filled"
            {...inputProps}
            key={index}
            value={formData[inputProps.name]}
            onChange={handleOnChange}
          />
        ))}
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
