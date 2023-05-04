import {useState} from "react";
import FirebaseAuth from "../firebase/auth";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import {toast} from "react-toastify";


// List of Inputs to be mapped in the form
const inputsData = [
    {
        label: "Email",
        type: "email",
        name: "email",
        required: true,
        InputProps: {endAdornment: <EmailIcon/>},
    },
    {
        label: "Phone Number",
        type: "tel",
        name: "phone",
        required: true,
        InputProps: {endAdornment: <PhoneIcon/>},
    },
];

export default function useForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
    });

    // handle input change
    const handleOnChange = (e) => {
        const {name, value} = e.target;

        setFormData((formValues) => ({
            ...formValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
         // handleSubmit will contain all the logic related
        // to make request to backend and submit form data
        e.preventDefault();
        try {
          FirebaseAuth.passwordReset(formData.email).then((res)=>{
            toast("Reset password link is sent to you Email", {type: "success"})
            })
        } catch (error) {
            console.error(error);
        }
    };

    return {
        inputs: inputsData,
        formData,
        handleOnChange,
        handleSubmit,
    };
}
