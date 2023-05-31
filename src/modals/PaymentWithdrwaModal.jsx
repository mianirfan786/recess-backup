import { Button, IconButton, Stack, Typography } from "@mui/material";
import DefaultModal from "./DefaultModal";
import CustomDivider from "../components/CustomDivider";
import { useState, useEffect } from "react";
import axios from 'axios';
import { JoinEventById } from "../firebase/functions/event/event-join";
import { sendEventJoinNotification } from "../firebase/functions/messaging";
import PaymentForm from "../components/EventDetails/Details/PaymentForm";
import StyledTextInput from "../components/StyledTextInput";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentWithdrawModal = ({ open, onClose , payment }) => {
    const [paymentPrice, setPaymentPrice] = useState(payment);

  const stripe = useStripe();
  const elements = useElements();


  const onModalClose = () => {
      setPaymentPrice(payment)
    onClose();
  };

  const handleChange = (e) => {

    const inputvalue = e.target.value !== "" ? parseInt(e.target.value) : 0;
      if (inputvalue < 0) {
          setPaymentPrice(0);
      }else
    if (inputvalue <= parseInt((payment))) {
        setPaymentPrice(inputvalue);

    }  else {
        setPaymentPrice(parseInt((payment)));
    }
  };
  const paymentWithdraw = async () => {

    if (!stripe || !elements) {
        return;
    }

    // const result = await stripe.createToken('bank_account', {
    //     country: 'US',
    //     currency: 'usd',
    //     account_number: '000123456789',
    //     routing_number: '110000000',
    //     account_holder_name: 'Muhammad Irfan',
    //     account_holder_type: 'individual',
    //   });
    //
    //   if (result.error) {
    //     // Handle token creation error
    //     console.error('Bank account token creation error:', result.error);
    //   } else {
    //     const bankAccountToken = result.token.id;
    //     console.log(bankAccountToken, ";;;;;;;")
    //     // Send the bankAccountToken to your server-side for further processing
    //     // ...
    //   }



    setPaymentPrice(0);
    onClose();
  };
  return (
    <DefaultModal open={open} onClose={onModalClose}>
      <div>
        <StyledTextInput
          style={{ width: "100%", backgroundColor:'#fff' }}
          type="number"
          required
          value={paymentPrice}
          onChange={handleChange}
          label=" Enter Ammount"
          variant="filled"
        />

        <Button
          onClick={paymentWithdraw}
          disabled={paymentPrice === 0 || paymentPrice === ""  ? true : false}
          variant="contained"
          fullWidth
          sx={{
            marginTop: "15px",
            // margin: "0 auto",
            maxWidth: "600px",
            backgroundColor: "#000",
            color: "info.main",
            borderRadius: 8,
            padding: 1,
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          Withdraw Payment
        </Button>
      </div>
    </DefaultModal>
  );
};

export default PaymentWithdrawModal;
