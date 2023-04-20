import {Stack} from "@mui/material";
import {Link} from "react-router-dom";
import {ROUTES} from "../../routes";
import FirebaseAuth from "../../firebase/auth";

const Footer = () => {
    return (
        <Stack flex={1} justifyContent="flex-end" spacing={2} alignItems="center" marginTop={"16px"}>
            <Link style={{color: "black"}} to={ROUTES.TERMS_OF_SERVICES}>
                Terms & conditions
            </Link>
            <Link style={{color: "red"}} onClick={() => FirebaseAuth.logOut()}>
                Sign out
            </Link>
        </Stack>
    );
};

export default Footer;
