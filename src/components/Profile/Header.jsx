import {Box, Stack, Typography} from "@mui/material";
import user from "../../images/user.jpg";
import PageHeader from "../PageHeader";

const Header = () => {
    return (
        <Stack gap={2}>
            <PageHeader title="Profile"/>
            <Stack
                alignItems="center"
                gap={2}
                flexDirection={{xs: "column", sm: "row"}}
                justifyContent="center"
            >
                <Box
                    maxWidth="150px"
                    sx={{aspectRatio: "1/1", border: "3px solid #2DC6FF"}}
                    borderRadius="50%"
                    overflow="hidden"
                    backgroundColor="#FFFF"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <img
                        style={{
                            objectFit: "cover",
                            width: "96%",
                            borderRadius: "50%",
                            overflow: "hidden",
                        }}
                        src={user}
                        alt="user"
                    />
                </Box>
                <Stack spacing={1} textAlign={{xs: "center", sm: "initial"}}>
                    <Typography variant="h2" fontSize="38px">
                        Andrey Rybin
                    </Typography>
                    <Typography sx={{opacity: 0.5}} color="#111315" variant="body1">
                        +799 942 912 412
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Header;
