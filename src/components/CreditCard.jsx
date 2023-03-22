import {Stack, Typography} from "@mui/material";
import MasterCard from "../icons/MasterCard";

const icons = {
    mastercard: MasterCard(),
    visa: "",
};

const CreditCard = ({type, number, isDefault = false}) => {
    return (
        <Stack
            borderRadius="15px"
            bgcolor="white"
            sx={{boxShadow: "0px 0.960653px 13.4491px rgba(233, 235, 248, 0.54)"}}
            flexDirection="row"
            justifyContent="space-between"
            p={3}
        >
            <Stack gap={1}>
                <Typography variant="body2">{type}</Typography>
                <Typography variant="h5">Ending with {number.slice(-4)}</Typography>
                {isDefault && (
                    <Typography color="primary" variant="body2">
                        Default
                    </Typography>
                )}
            </Stack>
            {icons[type]}
        </Stack>
    );
};

export default CreditCard;
