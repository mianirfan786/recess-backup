import {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import EmailIcon from "../icons/EmailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import UserIcon from "../icons/UserIcon";
import FirebaseAuth from "../firebase/auth";
import {showToast} from "../utils/toast";
import {db} from "../firebase/config";

// List of Inputs to be mapped in the form
const inputsData = [
    {
        label: "Name",
        type: "text",
        name: "name",
        required: true,
        InputProps: {endAdornment: <UserIcon/>},
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        required: true,
        InputProps: {endAdornment: <EmailIcon/>},
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        required: true,
        InputProps: {endAdornment: <PasswordIcon/>},
    },
    {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        required: true,
        InputProps: {endAdornment: <PasswordIcon/>},
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

    // handle input change
    const handleOnChange = (e) => {
        const {name, value, checked} = e.target;

        setFormData((formValues) => ({
            ...formValues,
            [name]: name === "termAndConditions" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // handleSubmit will contain all the logic related
        // to make request to backend and submit form data
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            return showToast({
                type: "error",
                message: "Please enter your auth credentials",
            });
        }

        if (formData.confirmPassword !== formData.password) {
            return showToast({
                type: "error",
                message: "Password and Confirm Password should be same",
            });
        }

        try {
            const res = await FirebaseAuth.signUpWithEmailAndPassword(
                formData.email,
                formData.password
            );

            await setDoc(
                doc(db, "users", res.user.uid),
                {
                    displayName: formData.name,
                    email: res.user.email,
                    groups: [],
                    photoURL: "",
                    uid: res.user.uid,
                    search: [res.user.email],
                },
                {merge: true}
            );

            showToast({
                type: "success",
                message: "Account created successfully!",
            });
        } catch (error) {
            if ("message" in error) {
                showToast({
                    type: "error",
                    message: error.message.replace("Firebase: ", ""),
                });
            } else {
                showToast({type: "error", message: error});
            }
        }
    };

    return {
        inputs: inputsData,
        formData,
        handleOnChange,
        handleSubmit,
    };
}
