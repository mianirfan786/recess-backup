import { useCreateEventContext } from "../../pages/CreateEvent";
import { Box, Button, Stack, Typography } from "@mui/material";

const SetPhoto = () => {
  const { photos, setState } = useCreateEventContext();

  return (
    <Stack textAlign="center">
      <Box mb={3}>
        <Button
          component="label"
          sx={{
            gap: "10px",
            height: { xs: "100px", sm: "200px" },
            minWidth: "200px",
            backgroundColor: photos.length > 0 ? "transparent" : "#C1C1C1",
            padding: 0,
          }}
        >
          {!!photos.length &&
            photos.map((photo) => (
              <img
                key={photo.lastModified}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  aspectRatio: "1/1",
                }}
                src={URL.createObjectURL(photo)}
                alt="list"
              />
            ))}
          <input
            multiple
            accept="image/*"
            type="file"
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                photos: [...e.target.files, ...prev.photos].slice(0, 3),
              }))
            }
            hidden
          />
        </Button>
      </Box>
      <Typography variant="h4" fontWeight="bold" color="primary">
        Set event photo
      </Typography>
      <Typography variant="body1">Add photos up to 3</Typography>
    </Stack>
  );
};

export default SetPhoto;
