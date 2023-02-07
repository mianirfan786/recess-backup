import { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import transactionImage from "../images/frisbee-3.png";

const Transactions = () => {
  const [transactions, setTransactions] = useState(
    [...new Array(10)].map((_, index) => ({
      id: index,
      description: "Ultimate Frisbee",
      address: "Scottsdale, AZ",
      amount: 19.99,
      date: new Date(),
      image: transactionImage,
    }))
  );

  return (
    <Container sx={{ my: 4 }}>
      <Stack gap={4}>
        <PageHeader title="Transactions" />
        <Stack gap={1}>
          {transactions.map(
            ({ id, date, description, address, amount, image }) => (
              <Stack
                alignItems="center"
                p={2}
                flexDirection="row"
                gap={2}
                sx={{
                  boxShadow:
                    "0px 0.960653px 13.4491px rgba(233, 235, 248, 0.54)",
                }}
                borderRadius="20px"
                key={id}
                bgcolor="white"
              >
                <Box
                  sx={{ aspectRatio: "1/1" }}
                  borderRadius="15px"
                  overflow="hidden"
                  maxWidth="70px"
                >
                  <img
                    style={{
                      aspectRatio: "1/1",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={image}
                    alt={description}
                  />
                </Box>
                <Stack gap={2}>
                  <Typography variant="body1" fontWeight="bold">
                    {description}
                  </Typography>
                  <Typography variant="body2">{address}</Typography>
                </Stack>
                <Stack ml="auto" gap={2}>
                  <Typography color="primary" variant="body1" fontWeight="bold">
                    USD {amount}
                  </Typography>
                  <Typography variant="body2">{`${date.toLocaleString("en-US", {
                    month: "long",
                  })} ${date.getUTCDate()}`}</Typography>
                </Stack>
              </Stack>
            )
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Transactions;
