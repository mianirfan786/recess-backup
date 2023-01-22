import { Box, CircularProgress } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import marker1 from "../../../images/marker-1.png";
import marker2 from "../../../images/marker-2.png";
import marker3 from "../../../images/marker-3.png";
import marker4 from "../../../images/marker-4.png";
import marker5 from "../../../images/marker-5.png";
import Map from "./Map";

const center = {
  lat: 26.24,
  lng: 73.03,
};

const markers = [
  {
    lat: 26.24,
    lng: 73.03,
    icon: marker1,
    label: "Marker 1",
  },
  {
    lat: 26.3,
    lng: 73.02,
    icon: marker2,
    label: "Marker 2",
  },
  {
    lat: 26.21,
    lng: 73.09,
    icon: marker3,
    label: "Marker 3",
  },
  {
    lat: 26.29,
    lng: 73.08,
    icon: marker4,
    label: "Marker 4",
  },
  {
    lat: 26.22,
    lng: 73.04,
    icon: marker5,
    label: "Marker 5",
  },
  // Add more markers as needed
];

const MapView = () => {
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
      <div>
        <Map center={center} events={markers} />
      </div>
    );
  }
};

export default MapView;
