import { useState } from "react";
import EmailIcon from "../icons/EmailIcon";
import PasswordIcon from "../icons/PasswordIcon";

// List of Inputs to be mapped in the form
const inputsData = [
  {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
    InputProps: { endAdornment: <EmailIcon /> },
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    required: true,
    InputProps: { endAdornment: <PasswordIcon /> },
  },
];

export default function useSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  console.log(formData);

  // handle input change
  const handleOnChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((formValues) => ({
      ...formValues,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // handleSubmit will contain all the logic related
    // to make request to backend and submit form data
  };

  return {
    inputs: inputsData,
    formData,
    handleOnChange,
    handleSubmit,
  };
}
