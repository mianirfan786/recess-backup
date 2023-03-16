import { Box, Button, Stack, Typography } from "@mui/material";
import "swiper/css";
import { useState } from "react";

const RecentlyAddedCard = ({ event }) => {
    const { photos, title, date, time, keywords } = event;
    const [bgGradient, setBgGradient] = useState("transparent");
    const waitForTitle = setInterval(() => {
        if (title !== null) clearInterval(waitForTitle);
        try{
            getAverageRGB();
        }
        catch{

        }
    }, 1000);

    const getAverageRGB = () => {
        let imgUrl = photos[0];
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imgUrl;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
                count++;
            }
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            setBgGradient(`linear-gradient(180deg, rgba(${r},${g},${b},0) 20%, rgba(${r},${g},${b},1) 90%)`);
        };
    }
    return (
        <Box
            sx={{
                background: `url(${photos}) no-repeat center center `,
                backgroundSize: "cover",
                height: 350,
                borderRadius: "25px",
                p: 3,
                display: "flex",
                alignItems: "flex-end",
                zIndex: -1,
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: bgGradient,
                    borderRadius: "25px",
                    zIndex: -1,
                },
            }}
        >
            <Box sx={{ mt: "auto", width: 1 }}>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#fff",
                            width: 2 / 3,
                            zIndex: 9999,
                            mb: 2,
                        }}
                    >
                        {title}
                    </Typography>
                    <Stack
                        direction="row"
                        sx={{ my: { xs: 1, md: 2 } }}
                        gap={{ xs: 0.5, md: 1 }}
                    >
                        <Typography color="info.main" variant="h6">
                            {date} .
                        </Typography>

                        <Typography color="info.main" variant="h6">
                            {time}
                        </Typography>
                    </Stack>
                </Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                >
                    <Button
                        sx={{
                            px: 3,
                            borderRadius: 50,
                            fontSize: { xs: 14, md: 16 },
                            fontWeight: 700,
                            textTransform: "capitalize",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
                            color: "text.primary",
                            boxShadow: 0,
                            "&:hover": {
                                backgroundColor: "primary.main",
                                color: "info.main",
                                boxShadow: 0,
                            },
                        }}
                        variant="contained"
                        color="info"
                    >
                        Join
                    </Button>
                    <Typography variant="body1" color="info.main">
                        1/8
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
};

export default RecentlyAddedCard;
