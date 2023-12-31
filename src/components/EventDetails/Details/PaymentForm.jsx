import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';
import {Box, Modal, Typography} from "@mui/material"; // Import your Firebase configuration
import app from '../../../firebase/config';
import {Button} from "@mui/material";
import {Close} from "@mui/icons-material";
import DefaultModal from "../../../modals/DefaultModal";
import axios from 'axios';
import {saveTransaction} from "../../../firebase/functions/transactions";
import {JoinEventById} from "../../../firebase/functions/event/event-join";
import {sendEventJoinNotification} from "../../../firebase/functions/messaging";

function PaymentForm({open, handleClose, displayAddress, cost, currentEvent, eventTitle, eventId, eventCreator, attendees}) {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        debugger
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const url = process.env.REACT_APP_FIREBASE_DATABASE_URL+"/create_payment"


        const { data: { clientSecret } } = await axios.post(url, { amount: (cost * attendees) * 100, currency: 'usd' });
        const cardElement = elements.getElement(CardElement);
        debugger
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        debugger
        if (result.paymentIntent.status === "succeeded") {
            debugger
            JoinEventById(eventId, attendees);
            sendEventJoinNotification(eventTitle, eventId, eventCreator);
            saveTransaction({
                cost: cost,
                status: "success",
                address: displayAddress || "N/A",
                id: result.paymentIntent.id,
                description: eventTitle,
                image: currentEvent.photos,
            }).then(() => {
                handleClose(true);
            })
        }

        if (result.error) {
            debugger
            setError(result.error.message);
            setProcessing(false);
        } else {
            debugger
            setError(null);
            setProcessing(false);
            setSuccess(true);
        }
    };

    return (
        <DefaultModal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{
                    marginBottom: 2,
                }}>
                    Pay ${cost*attendees}
                </Typography>
                <Close onClick={handleClose} sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    cursor: "pointer",
                }}/>
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <Button fullWidth
                            sx={{
                                backgroundColor: "#000",
                                color: "info.main",
                                borderRadius: 8,
                                padding: 1,
                                marginTop: 2,
                                "&:hover": {
                                    backgroundColor: "#000",
                                },
                            }} type="submit" disabled={!stripe || processing || success}>
                        {processing ? 'Processing...' : 'Pay'}
                    </Button>
                    {error && <div>{error}</div>}
                    {success && <div>Payment successful!</div>}
                </form>
            </Box>
        </DefaultModal>
    );
}

export default PaymentForm;
