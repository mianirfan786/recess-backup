import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import location from "../../../images/location.png";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const Map = ({ center, events }) => {
  const [selected, setSelected] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

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
  console.log(events);

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {/* Show a marker for the user's current position */}
      {userPosition && <Marker position={userPosition} icon={location} />}

      {/* Show markers for each location in the markers array */}
      {events?.map((event) => (
        <Marker
          key={event?.label}
          position={{ lat: event?.lat, lng: event?.lng }}
          icon="https://cdn-icons-png.flaticon.com/512/4127/4127806.png"
          label={event?.label}
          onClick={() => {
            setSelected(event);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h2>{selected.label}</h2>
            <p>Custom information about this marker</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Map;
