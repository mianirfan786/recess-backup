import {useNavigate} from "react-router-dom";
import {Container, Stack, Typography} from "@mui/material";
import RightArrow from "../icons/RightArrow";
import PageHeader from "../components/PageHeader";
import {ROUTES} from "../routes";
import PaymentDetails from "../icons/PaymentDetails";
import TransactionsIcon from "../icons/TransactionsIcon";

const actions = [
    {
        icon: PaymentDetails(),
        title: "Payment Details",
        link: ROUTES.PAYMENT_DETAILS,
    },
    {
        icon: TransactionsIcon(),
        title: "Transactions",
        link: ROUTES.TRANSACTIONS,
    },
    {
        icon: PaymentDetails(),
        title: "Pay with (demo)",
        link: ROUTES.PAY_WITH,
    },
    {
        icon: PaymentDetails(),
        title: "Set up payments (demo)",
        link: ROUTES.SET_UP_PAYMENT,
    },
    {
        icon: PaymentDetails(),
        title: "Add card details (demo)",
        link: ROUTES.ADD_CARD_DETAILS,
    },
];

const Payments = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{my: 4}}>
            <Stack gap={4}>
                <PageHeader title="Payments"/>
                <Stack gap={1}>
                    {actions.map(({icon, title, link}) => (
                        <Stack
                            onClick={() => navigate(link)}
                            sx={{cursor: "pointer"}}
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            borderRadius="15px"
                            p={2}
                            bgcolor="#ECF5F2"
                            key={title}
                        >
                            {icon}
                            <Typography variant="body1" fontWeight="bold">
                                {title}
                            </Typography>
                            <RightArrow/>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};

export default Payments;
