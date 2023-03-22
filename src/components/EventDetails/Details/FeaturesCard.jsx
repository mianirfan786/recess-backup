import {Card, Stack, Typography} from "@mui/material";

const FeaturesCard = ({keyword, participant, cost}) => {
    return (
        <Card sx={{borderRadius: 4}}>
            <Stack
                py={1}
                px={3}
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
            >
                <Stack alignItems="center" gap={1}>
                    <Typography color="#9A9EA0" variant="body2">
                        Keyword
                    </Typography>
                    <Typography variant="body1">{keyword}</Typography>
                </Stack>
                <Stack alignItems="center" gap={1}>
                    <Typography color="#9A9EA0" variant="body2">
                        Max Players
                    </Typography>
                    <Typography variant="body1">{participant}</Typography>
                </Stack>
                <Stack alignItems="center" gap={1}>
                    <Typography color="#9A9EA0" variant="body2">
                        Participation Cost
                    </Typography>
                    <Typography variant="body1">{cost}</Typography>
                </Stack>
            </Stack>
        </Card>
    );
};

export default FeaturesCard;
