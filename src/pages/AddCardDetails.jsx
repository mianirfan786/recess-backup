import {Box, Button, Container, Stack, TextField} from "@mui/material";
import PageHeader from "../components/PageHeader";
import {useState} from "react";
import Payments from "../icons/Payments";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {getCurrentUser} from "../firebase/functions/user";
import {db} from "../firebase/config";

const AddCardDetails = () => {
    const [{cardNumber, expiry, cvv, postcode}, setState] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        postcode: "",
    });

    const saveCard = () => {
        const currentUser = getCurrentUser();
        /* add to users collections > currentuser */
        const userRef = doc(db, "users", currentUser);
        updateDoc(userRef, {
            cardDetails: {
                cardNumber,
                expiry,
                cvv,
                postcode,
            }
        })
    }

    const onExpiryChange = (e) => {
        const {value} = e.target;

        if (value.length > 5) return;

        if (value.length === 2 && expiry.slice(-1) !== "/") {
            setState((prev) => ({...prev, expiry: `${value}/`}));
        } else {
            setState((prev) => ({...prev, expiry: value}));
        }
    };

    return (
        <Container sx={{my: 4}}>
            <Stack textAlign="center" gap={4}>
                <PageHeader title="Add card details"/>
                <Stack gap={2}>
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <Box sx={{opacity: 0.5}}>
                                    <Payments color="#CED1DC"/>
                                </Box>
                            ),
                        }}
                        fullWidth
                        focused
                        placeholder="0000 0000 0000 0000"
                        label="Card number"
                        variant="filled"
                        value={cardNumber}
                        onChange={(e) =>
                            setState((prev) => ({...prev, cardNumber: e.target.value}))
                        }
                    />
                    <Stack gap={2} flexDirection="row">
                        <TextField
                            fullWidth
                            focused
                            placeholder="MM/YY"
                            label="Expiry"
                            variant="filled"
                            value={expiry}
                            onChange={onExpiryChange}
                        />
                        <TextField
                            type="number"
                            fullWidth
                            focused
                            placeholder="123"
                            label="CVV"
                            variant="filled"
                            value={cvv}
                            onChange={(e) =>
                                setState((prev) => ({...prev, cvv: e.target.value}))
                            }
                        />
                        <TextField
                            onChange={(e) =>
                                setState((prev) => ({...prev, postcode: e.target.value}))
                            }
                            fullWidth
                            type="number"
                            focused
                            placeholder="00000"
                            label="Postcode"
                            variant="filled"
                            value={postcode}
                        />
                    </Stack>
                </Stack>
                <Button
                    onClick={saveCard}
                    variant="contained"
                    fullWidth
                    sx={{
                        margin: "0 auto",
                        maxWidth: {xs: "100%", sm: "600px"},
                        backgroundColor: "#000",
                        color: "info.main",
                        borderRadius: 8,
                        padding: 1,
                        "&:hover": {
                            backgroundColor: "#000",
                        },
                    }}
                >
                    Save
                </Button>
            </Stack>
        </Container>
    );
};

export default AddCardDetails;
