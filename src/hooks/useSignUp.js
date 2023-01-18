import { useState } from "react";
import EmailIcon from "../icons/EmailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import UserIcon from "../icons/UserIcon";

// List of Inputs to be mapped in the form
const inputsData = [
  {
    label: "Name",
    type: "text",
    name: "name",
    required: true,
    InputProps: { endAdornment: <UserIcon /> },
  },
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
    name: "paswword",
    required: true,
    InputProps: { endAdornment: <PasswordIcon /> },
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    required: true,
    InputProps: { endAdornment: <PasswordIcon /> },
  },
];

export default function useSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termAndConditions: false,
  });
  console.log(formData);

  // handle input change
  const handleOnChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((formValues) => ({
      ...formValues,
      [name]: name === "termAndConditions" ? checked : value,
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
