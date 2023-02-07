import { ROUTES } from "../routes";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import RightArrow from "../icons/RightArrow";
import Payments from "../icons/Payments";
import PaypalIcon from "../icons/PaypalIcon";

const actions = [
  {
    icon: Payments(),
    title: "Credit or debit card",
    link: ROUTES.PAYMENTS,
  },
  {
    icon: PaypalIcon(),
    title: "Paypal",
    link: ROUTES.PAYMENTS,
  },
];

const PayWith = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ my: 4 }}>
      <Stack gap={4}>
        <PageHeader title="Pay With" />
        <Stack gap={1}>
          {actions.map(({ icon, title, link }) => (
            <Stack
              onClick={() => navigate(link)}
              sx={{ cursor: "pointer" }}
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
              <RightArrow />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default PayWith;
