import {Button, Container, Stack, Typography} from "@mui/material";
import PageHeader from "../components/PageHeader";
import CreditCard from "../components/CreditCard";
import {useModalsContext} from "../modals/ModalsContext";
import { MODALS } from "../modals/modals";
import PaymentWithdrwaMoal from "../modals/PaymentWithdrwaModal";
import {useState} from "react";


const paymentDetail = [
    {cardType: "Total Payment", paymentPrice: "1000", isDefault: true},
    {cardType: "Pending Payment", paymentPrice: "200", isDefault: false},
    {cardType: "Withdrawable Payment", paymentPrice: "800", isDefault: false},
];


export const PaymentCard = ({cardType, paymentPrice}) => {



    return (
        <Stack
            borderRadius="15px"
            bgcolor="white"
            sx={{
                boxShadow: "0px 0.960653px 13.4491px rgba(233, 235, 248, 0.54)",
                width: {
                    xs: '100%',
                    md: '400px',
                },
            }}
            flexDirection="row"
            justifyContent="center"
            pt={5}
            pb={5}


        >
            <Stack gap={1} >
                <Typography variant="h5">{cardType}</Typography>
                <Typography variant="h6">{paymentPrice}</Typography>

            </Stack>

        </Stack>
    );
};


const PaymentWithdraw = () => {




    const {openModal, setOpenModal} = useModalsContext();



    return (
        <>
        <PaymentWithdrwaMoal
                open={openModal === MODALS.PAYMENT_WITHDRAW}
                onClose={() => setOpenModal(null)}
                payment={paymentDetail[2]?.paymentPrice}
            />
        <Container sx={{my: 4}} >
            <Stack  gap={4}>
                <PageHeader title="Payment Withdraw"/>
                <Stack justifyContent={"space-between"}  sx={{
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                        lg: 'row',
                    },
                }}  direction="row" gap={4} >
                    {paymentDetail.map((payment, index) => (
                        <PaymentCard {...payment} key={index}/>
                    ))}
                </Stack>
            </Stack>
        </Container>

            <Container  flexDirection="row"  sx={{my: 8}}>

                <Stack  gap={4}>
                    <Button
                        onClick={() => {
                            setOpenModal(MODALS.PAYMENT_WITHDRAW)
                        }}
                        variant="contained"
                        fullWidth
                        sx={{
                            margin: "0 auto",
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
                        Withdraw Payment - {paymentDetail[2]?.paymentPrice}
                    </Button>
                </Stack>
            </Container>
        </>
    );
};

export default PaymentWithdraw;
