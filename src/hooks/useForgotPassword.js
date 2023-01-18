import { useState } from "react";
import EmailIcon from "../icons/EmailIcon";

// List of Inputs to be mapped in the form
const inputsData = [
  {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
    InputProps: { endAdornment: <EmailIcon /> },
  },
];

export default function useForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  console.log(formData);

  // handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((formValues) => ({
      ...formValues,
      [name]: value,
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
