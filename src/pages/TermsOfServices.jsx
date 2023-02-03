import { Container, Stack, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";

const TermsOfServices = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Stack gap={3}>
        <PageHeader title="Terms of Services" />
        <Typography fontSize="40px" variant="h2" fontWeight="bold">
          Recess Privacy Introduction
        </Typography>
        <Typography color="#8E949B" variant="body1">
          Effective:October 30, 2022
        </Typography>
        <Typography variant="body1" textTransform="uppercase">
          Important: Please read the terms and conditions of this software
          license and terms of services carefully before using the software (as
          define below).
        </Typography>
        <Typography variant="body1">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt nostrud
          amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do
          amet sint. Velit officia consequat duis enim velit mollit.
          Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non
          deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt
          nostrud amet.
          <br />
          <br />
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint.
          <br />
          <br />
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint.
        </Typography>
      </Stack>
    </Container>
  );
};

export default TermsOfServices;
