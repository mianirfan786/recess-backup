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

function PaymentForm({open, handleClose, cost, currentEvent, eventTitle, eventId, eventCreator, attendees}) {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const functions = getFunctions(app);
        const url = "https://us-central1-recessmobile-d2ab0.cloudfunctions.net/create_payment"
        const { data: { clientSecret } } = await axios.post(url, { amount: cost * 100, currency: 'usd' });
        const cardElement = elements.getElement(CardElement);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });


        if (result.paymentIntent.status === "succeeded") {
            console.log("Payment Successful");
            console.log(currentEvent);
            JoinEventById(eventId, attendees);
            sendEventJoinNotification(eventTitle, eventId, eventCreator);
            saveTransaction({
                cost: cost,
                status: "success",
                address: currentEvent.address.displayAddress,
                id: result.paymentIntent.id,
                description: eventTitle,
                image: currentEvent.photos,
            }).then(() => {
                console.log("Transaction saved");
                handleClose();
            })
        }

        if (result.error) {
            setError(result.error.message);
            setProcessing(false);
        } else {
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
                    Pay ${cost}
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
