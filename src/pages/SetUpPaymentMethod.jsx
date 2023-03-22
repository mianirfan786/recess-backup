import {Button, Container, Stack, Typography} from "@mui/material";
import PageHeader from "../components/PageHeader";

const SetUpPaymentMethod = () => {
    return (
        <Container sx={{my: 4}}>
            <Stack textAlign="center" gap={2}>
                <PageHeader mb={2} title=""/>
                <Typography variant="h3">Set up a payment method</Typography>
                <Typography variant="body1">
                    Use your payment methods to make purchases on Flueno.{" "}
                    <span style={{color: "#2DC6FF", cursor: "pointer"}}>
            Learn more.
          </span>
                </Typography>
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

export default SetUpPaymentMethod;
