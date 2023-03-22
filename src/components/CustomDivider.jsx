import {Box} from "@mui/material";

const CustomDivider = () => {
    return (
        <Box
            sx={{
                background:
                    "linear-gradient(270deg, rgba(216, 217, 223, 0) 0%, #D8D9DF 51.04%, rgba(216, 217, 223, 0) 100%)",
            }}
            borderRadius="100px"
            height="1px"
            width="100%"
        />
    );
};

export default CustomDivider;
