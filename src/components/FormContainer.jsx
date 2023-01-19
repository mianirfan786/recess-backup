import Container from "@mui/system/Container";

const FormContainer = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Container maxWidth="sm" sx={{ paddingTop: "70px" }}>
        {children}
      </Container>
    </div>
  );
};

export default FormContainer;
