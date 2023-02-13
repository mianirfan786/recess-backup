import { useState } from "react";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";

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
    label: "Phone Number",
    type: "tel",
    name: "phone",
    required: true,
    InputProps: { endAdornment: <PhoneIcon /> },
  },
];

export default function useForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

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
