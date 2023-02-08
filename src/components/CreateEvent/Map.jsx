import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCreateEventContext } from "../../pages/CreateEvent";

const CustomMap = ({ center, height }) => {
  const [selected, setSelected] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  const { address, setState } = useCreateEventContext();

  useEffect(() => {
    if (!selected) return;

    setLoading(true);

    fetch(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?" +
        new URLSearchParams({
          latitude: selected.latLng.lat(),
          longitude: selected.latLng.lng(),
          localityLanguage: "en",
        }),
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => setState((state) => ({ ...state, address: data })))
      .finally(() => setLoading(false));
  }, [selected]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.log(error)
    );
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: height || "100vh",
        position: "relative",
      }}
      onClick={(e) => setSelected(e)}
      zoom={10}
      center={userPosition || center}
    >
      {selected && <MarkerF position={selected.latLng.toJSON()} />}
      {loading && (
        <Stack
          left="50%"
          top="30%"
          sx={{ transform: "translateX(-50%)" }}
          position="absolute"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={60} />
        </Stack>
      )}
      {address && (
        <Stack
          width="100%"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          position="absolute"
          p={2}
          bottom={0}
          gap={2}
        >
          <Stack
            sx={{
              backgroundColor: "#FFFFFF",
              width: "100%",
              borderRadius: "15px",
              padding: "12px",
            }}
          >
            <Typography sx={{ opacity: 0.5 }} variant="body2">
              Address
            </Typography>
            <Typography fontWeight={600} variant="body1">
              {address.locality}
            </Typography>
          </Stack>
          <Stack flexDirection="row" gap={2}>
            <Stack
              sx={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                borderRadius: "15px",
                padding: "12px",
              }}
            >
              <Typography sx={{ opacity: 0.5 }} variant="body2">
                City
              </Typography>
              <Typography fontWeight={600} variant="body1">
                {address.city || "N/A"}
              </Typography>
            </Stack>
            <Stack
              sx={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                borderRadius: "15px",
                padding: "12px",
              }}
            >
              <Typography sx={{ opacity: 0.5 }} variant="body2">
                State
              </Typography>
              <Typography fontWeight={600} variant="body1">
                {address.principalSubdivision}
              </Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row" gap={2}>
            <Stack
              sx={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                borderRadius: "15px",
                padding: "12px",
              }}
            >
              <Typography sx={{ opacity: 0.5 }} variant="body2">
                Latitude
              </Typography>
              <Typography fontWeight={600} variant="body1">
                {address.latitude.toFixed(2)}
              </Typography>
            </Stack>
            <Stack
              sx={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                borderRadius: "15px",
                padding: "12px",
              }}
            >
              <Typography sx={{ opacity: 0.5 }} variant="body2">
                Longitude
              </Typography>
              <Typography fontWeight={600} variant="body1">
                {address.longitude.toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </GoogleMap>
  );
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) {
    return (
      <Box sx={{ py: 2, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isLoaded && !loadError) {
    return (
      <Box width="100%">
        <CustomMap height="600px" center={{ lat: 23.76, lng: 90.38 }} />
      </Box>
    );
  }
};

export default Map;
