import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Stack flex={1} justifyContent="flex-end" spacing={2} alignItems="center">
      <Link style={{ color: "black" }} to="/terms-conditions ">
        Terms & conditions
      </Link>
      <Link style={{ color: "red" }} to="/sign-up">
        Sign out
      </Link>
    </Stack>
  );
};

export default Footer;
