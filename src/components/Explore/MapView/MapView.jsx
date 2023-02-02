import { Box, CircularProgress } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import marker1 from "../../../images/marker-1.png";
import marker2 from "../../../images/marker-2.png";
import marker3 from "../../../images/marker-3.png";
import marker4 from "../../../images/marker-4.png";
import marker5 from "../../../images/marker-5.png";
import Map from "./Map";

const _markers = [
  {
    lat: 23.84,
    lng: 90.25,
    icon: marker1,
    label: "Marker 1",
  },
  {
    lat: 23.62,
    lng: 90.47,
    icon: marker2,
    label: "Marker 2",
  },
  {
    lat: 24.37,
    lng: 90.0,
    icon: marker3,
    label: "Marker 3",
  },
  {
    lat: 23.86,
    lng: 90.0,
    icon: marker4,
    label: "Marker 4",
  },
  {
    lat: 23.46,
    lng: 91.18,
    icon: marker5,
    label: "Marker 5",
  },
  // Add more markers as needed
];

const _center = {
  lat: 23.76,
  lng: 90.38,
};

const MapView = ({ center = _center, markers = _markers, height }) => {
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
        <Map center={center} events={markers} height={height} />
      </div>
    );
  }
};

export default MapView;
