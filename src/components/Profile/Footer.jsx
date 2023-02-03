import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

const Footer = () => {
  return (
    <Stack flex={1} justifyContent="flex-end" spacing={2} alignItems="center">
      <Link style={{ color: "black" }} to={ROUTES.TERMS_OF_SERVICES}>
        Terms & conditions
      </Link>
      <Link style={{ color: "red" }} to={ROUTES.SIGN_UP}>
        Sign out
      </Link>
    </Stack>
  );
};

export default Footer;
