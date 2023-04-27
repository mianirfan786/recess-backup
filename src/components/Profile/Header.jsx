import {Box, Button, Stack, Container} from "@mui/material";
import userIcon from "../../images/user.jpg";
import PageHeader from "../PageHeader";
import {useEffect, useState} from "react";
import {GetCurrentUserDetails} from "../../firebase/functions/user";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {doc, getFirestore, updateDoc} from "firebase/firestore";
import app from "../../firebase/config";
import {toast} from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const Header = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [oldPhone, setOldPhone] = useState("");
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState({});
    const [tempPhotoURL, setTempPhotoURL] = useState(null);

    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        GetCurrentUserDetails().then(r => {
            console.log(r);
            setUser(r);
            setName(r.displayName);
            setPhone(r.phone ? r.phone : "");
        });
    }, []);

    useEffect(() => {
        toast(errorMessage, {type: "error"})
    }, [errorMessage]);


    const handleFileUpload = async (event) => {
        setTempPhotoURL(event.target.files[0]);
    }

    const handleUpdateName = async () => {
        const db = getFirestore(app);
        const storage = getStorage();
        const auth = getAuth();
        if (name === "") {
            toast("Name cannot be empty!", {type: "error"});
        }
        else if (name === user.displayName) {
            toast("Name is same as before!", {type: "error"});
        }
        else{
            await updateDoc(doc(db, "users", user.uid), {
                displayName: name
            });
            toast("Name updated!", {type: "success"});
        }
        if(tempPhotoURL){
            toast("Uploading photo...", {type: "info"})
            const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            try {
                // Upload the image file to Firebase Storage
                const storageRef = ref(storage, `${randomName}`);
                await uploadBytes(storageRef, tempPhotoURL);

                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(storageRef);

                // Update the user document in Firestore with the download URL
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, { photoURL: downloadURL });

                // Update the local state with the new photo URL
                setUser({
                    ...user,
                    photoURL: downloadURL,
                });
            } catch (error) {
                console.error(error);
            }
        }

    }

    const handleSendCode = async () => {
        const db = getFirestore(app);
        const auth = getAuth();
        if (phone === oldPhone) {
            toast("Phone number is same as before!", {type: "error"});
            return;
        }
        if (phone === "") {
            toast("Phone number cannot be empty!", {type: "error"});
            return;
        }
        try {
            const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, getAuth());

            const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
            setErrorMessage(null);
            const code = window.prompt('Please enter the verification code sent to your phone:');
            if (code) {
                const res = await confirmationResult.confirm(code);
                if (res.user) {
                    setIsPhoneVerified(true);
                    setOldPhone(phone);
                    updateDoc(doc(db, "users", user.uid), {
                        phone: phone,
                        isPhoneVerified: true
                    });
                    toast("Phone number verified!", {type: "success"});
                }
            }
            const recaptchaContainer = document.getElementById('recaptcha-container');
            while (recaptchaContainer.firstChild) {
                recaptchaContainer.removeChild(recaptchaContainer.firstChild);
            }
        } catch (error) {
            console.log("error");
            setErrorMessage(error.message);
        }

    };

    return (
        <Container sx={{py: {xs: 3.5, md: 4}}} >
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems=""
                gap={2}
            >
        
            <PageHeader title="Profile"/>
            <Stack
                alignItems="center"
                gap={2}
                flexDirection={{xs: "column", sm: "row"}}
                justifyContent="center"
            >
                <Box
                    maxWidth="150px"
                    sx={{aspectRatio: "1/1", border: "3px solid #2DC6FF"}}
                    borderRadius="50%"
                    width={"100%"}
                    overflow="hidden"
                    backgroundColor="#FFFF"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                >
                    <img
                        style={{
                            objectFit: "cover",
                            width: "96%",
                            aspectRatio: "1/1",
                            borderRadius: "50%",
                            overflow: "hidden",
                        }}
                        src={user?.photoURL ? user.photoURL : "https://cdn1.iconfinder.com/data/icons/messenger-and-society/16/user_person_avatar_unisex-512.png"}
                        alt="user"
                    />
                    <input
                        type="file" accept="image/*"
                        onChange={handleFileUpload}
                        style={{
                            display: isUpdating ? "block" : "none",
                            background: "#2DC6FF",
                            color: "#FFFF",
                            height: "100%",
                            width: "100%",
                            paddingTop: "60px",
                            paddingLeft: "30px",
                            position: "absolute",
                            opacity: .7,
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "center",
                        }}
                    />
                </Box>
                <Stack spacing={1}  alignItems={"center"} textAlign={{xs: "center", sm: "initial"}}>
                    <input
                        type="text"
                        readOnly={!isUpdating}
                        style={{
                            fontSize: "38px",
                            border: "none",
                            outline: "none",
                            boxShadow: isUpdating ? "0 0 50px 1px rgba(0,0,0,.1)" : "none",
                            borderRadius: "5px",
                            backgroundColor: isUpdating ? "#FFFF" : "transparent",
                            width: "100%",
                            textAlign: "center",
                        }}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="tel"
                        readOnly={!isUpdating}
                        style={{
                            fontSize: "18px",
                            border: "none",
                            outline: "none",
                            boxShadow: isUpdating ? "0 0 50px 1px rgba(0,0,0,.1)" : "none",
                            borderRadius: "5px",
                            backgroundColor: isUpdating ? "#FFFF" : "transparent",
                            height: isUpdating ? "3rem" : "unset",
                            color:"#111315",
                            width: "100%",
                            textAlign: "center",

                        }}
                        onChange={e => setPhone(e.target.value)}
                        value={isUpdating ? phone : phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")}
                    />
                    <div
                        style={{
                            display: isUpdating ? "block" : "none",
                        }}
                        id="recaptcha-container"></div>
                    <Button
                        onClick={() => {
                            handleSendCode()
                        }}
                        style={{
                            display: isUpdating ? "block" : "none",
                            background: "#2DC6FF",
                            color: "#FFFF",
                            maxWidth: "120px"
                        }}
                    >
                        Send OTP
                    </Button>
                    <Button
                        onClick={() => {
                            if (isUpdating) {
                                handleUpdateName()
                            }
                            setIsUpdating(prevState => !prevState)
                        }}
                        sx={{
                            display: "block",
                            background: "#2DC6FF",
                            color: "#FFFF",
                            maxWidth: "120px",
                            '&:hover': {
                                background: '#2DC6FF',
                            },
                        }}
                        background= {"#2DC6FF"}

                    >
                        {isUpdating ? "Save" : "Edit"}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
        </Container>
    );
};

export default Header;
