import {Button, Container, Stack} from "@mui/material";
import PageHeader from "../components/PageHeader";
import CreditCard from "../components/CreditCard";

const cards = [
    {type: "mastercard", number: "1234567890", isDefault: true},
    {type: "mastercard", number: "1234567890", isDefault: false},
];

const PaymentDetails = () => {
    return (
        <Container sx={{my: 4}}>
            <Stack gap={4}>
                <PageHeader title="Payment details"/>
                <Stack gap={2}>
                    {cards.map((card, index) => (
                        <CreditCard {...card} key={index}/>
                    ))}
                </Stack>
                <Button
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
                    Add Payment Method
                </Button>
            </Stack>
        </Container>
    );
};

export default PaymentDetails;
