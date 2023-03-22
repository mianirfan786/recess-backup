import {Box, Stack, Typography} from "@mui/material";

const UserCard = ({user}) => {
    const {displayName, image, host} = user;
    const nameParts = displayName.split(" ");
    if (nameParts.length >= 1) {
        var firstName = nameParts[0];
        var lastName = nameParts[1];
    } else {
        var firstName = displayName;
        var lastName = "";
    }
    return (
        <Box
            sx={{backgroundColor: "#F7FAFF", border: "1px solid #E2EFFF"}}
            borderRadius="40px"
        >
            <Box position="relative" overflow="hidden" borderRadius="40px">
                {host && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{backgroundColor: "#B3B2AD", opacity: 0.95}}
                        px={2}
                        py={1}
                        fontWeight="bold"
                        color="#FFB72D"
                        borderRadius="20px"
                        position="absolute"
                        left={20}
                        bottom={20}
                    >
                        HOST
                    </Box>
                )}
                <img
                    style={{width: "100%", objectFit: "cover"}}
                    src={image}
                    alt={displayName}
                />
            </Box>
            <Stack p={3}>
                <Typography variant="body1" fontWeight="bold">
                    {firstName}
                </Typography>
                <Typography variant="body1">{lastName}</Typography>
            </Stack>
        </Box>
    );
};

export default UserCard;
