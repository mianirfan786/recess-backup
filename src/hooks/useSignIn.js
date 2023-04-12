import {useState} from "react";
import EmailIcon from "../icons/EmailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import {showToast} from "../utils/toast";
import FirebaseAuth from "../firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebase/config";


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
        label: "Password",
        type: "password",
        name: "password",
        required: true,
        InputProps: {endAdornment: <PasswordIcon/>},
    },
];

export default function useSignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    // handle input change
    const handleOnChange = (e) => {
        const {name, value, checked} = e.target;

        setFormData((formValues) => ({
            ...formValues,
            [name]: name === "rememberMe" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // handleSubmit will contain all the logic related
        // to make request to backend and submit form data
        if (!formData.email || !formData.password) {
            return showToast({
                type: "error",
                message: "Please enter your auth credentials",
            });
        }

        try {
            await FirebaseAuth.logInWithEmailAndPassword(
                formData.email,
                formData.password
            );
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

    const handleGoogleSignIn = async () => {
        try {
            const res = await FirebaseAuth.googleSignIn();
            await setDoc(
                doc(db, "users", res.user.uid),
                {
                    displayName: res.user.displayName,
                    email: res.user.email,
                    groups: [],
                    photoURL: res.user.photoURL,
                    uid: res.user.uid,
                    search: [res.user.email],
                },
                {merge: true}
            );
            return res;
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

    const handleFacebookSignIn = async () => {
        try {
            const res = await FirebaseAuth.facebookSignIn();
            await setDoc(
                doc(db, "users", res.user.uid),
                {
                    displayName: res.user.displayName,
                    email: res.user.email,
                    groups: [],
                    photoURL: res.user.photoURL,
                    uid: res.user.uid,
                    search: [res.user.email],
                },
                {merge: true}
            );
            return res;
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

    const handleAppleSignIn = async () => {
        try {
            const res = await FirebaseAuth.appleSignIn();
            await setDoc(
                doc(db, "users", res.user.uid),
                {
                    displayName: res.user.displayName,
                    email: res.user.email,
                    groups: [],
                    photoURL: res.user.photoURL,
                    uid: res.user.uid,
                    search: [res.user.email],
                },
                {merge: true}
            );
            return res;
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
        handleGoogleSignIn,
        handleAppleSignIn,
        handleFacebookSignIn,
    };
}
