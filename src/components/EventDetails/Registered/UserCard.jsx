import { Box, Stack, Typography } from "@mui/material";

const UserCard = ({ user }) => {
  const { name, surname, image, host } = user;
  return (
    <Box
      sx={{ backgroundColor: "#F7FAFF", border: "1px solid #E2EFFF" }}
      borderRadius="40px"
    >
      <Box position="relative" overflow="hidden" borderRadius="40px">
        {host && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "#B3B2AD", opacity: 0.95 }}
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
          style={{ width: "100%", objectFit: "cover" }}
          src={image}
          alt={name}
        />
      </Box>
      <Stack p={3}>
        <Typography variant="body1" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body1">{surname}</Typography>
      </Stack>
    </Box>
  );
};

export default UserCard;
