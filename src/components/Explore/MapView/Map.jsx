import React, { useState, useEffect } from "react";
import Map, { Marker, Popup} from 'react-map-gl';
// import location from "../../../images/location.png";
import { ReactComponent as Location  } from "../../../images/location.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { mapStyle } from "./mapStyle";
import { CustomMarker } from "./customMarker";
// import { EventRepeat } from "@mui/icons-material";
import { ROUTES } from "../../../routes";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";
let center = {}

const MapBox = ({  events, height, onUserLocationChange }) => {
  const positionPoints = useSelector(state => state.LocationReducer.positionPoints)
  
  const [selected, setSelected] = useState(null);
  const [userPosition, setUserPosition] = useState(positionPoints);
  let isEventsArray = false;
  const navigate = useNavigate();

  /* convert events to array of an object */
  /* check if events is an array */
  if (events && !Array.isArray(events)) { 
    // center = {
    //   latitude: events?coordinates.lat,
    //   longitude: events?coordinates.lng,
    // };
  } else {
    // center = {
    //   latitude: events[0]?.latitude,
    //   longitude: events[0]?.longitude,
    // };
    isEventsArray = true;
  }

  useEffect(() => {
    if (isEventsArray) {
      onUserLocationChange(userPosition);
    }
  }, [userPosition]);


  const handleClickedMap = (e) => {
       setSelected(null);
       /* set userPosition where i have clicked */
       if(isEventsArray){
          setUserPosition({
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
     })
  }
}
  return (
    <div style={{width: "100%", height: "100vh"}}>
    <Map
      initialViewState={{
        latitude: events?events.latitude:positionPoints.lat,
        longitude: events?events.longitude:positionPoints.lng,
        zoom: 12,
      }}
      mapboxAccessToken={"pk.eyJ1IjoiYXItcmVobWFuMTM1IiwiYSI6ImNsZTJmYjl5djAwdnAzd28yczFnemNtZGEifQ.riw8y9JzuIU59NDfoe0NcA"}
      style={{width: "100%", height:"100%"}}
      mapStyle="mapbox://styles/ar-rehman135/clh095mus00j301pgd330g67n"
    //   onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={handleClickedMap}     
      >
        {/* // Show markers for each location in the markers array */}
        {events && isEventsArray && events.map((event) => (
            <Marker
              key={event.id}
              latitude={event.latitude}
              longitude={event.longitude}
              anchor="top"
            >
                <CustomMarker photo={event.photos[0]}   event={event} setSelected={setSelected}/>
            </Marker>
          ))}
             {events && !isEventsArray && (
                
                    <Marker
                      key={events?.id}
                      latitude={events?.latitude}
                      longitude={events?.longitude}
                      anchor="top"
                    >
                        <CustomMarker photo={events.photos[0]}  event={events} setSelected={setSelected}/>
                    </Marker>)}

        {/* Show a marker for the user's current position */}
        {userPosition && (
          <Marker latitude={userPosition.lat} longitude={userPosition.lng} anchor="top">
            <Location />
          </Marker>
        )}

             {selected ? (
                 <Popup
                 longitude={selected?.longitude}
                 latitude={selected?.latitude}
                 closeButton={true}
                 closeOnClick={false}
                 anchor="top"
                     onClose={() => {
                         setSelected(null);
                     }}
                 >
                     <div>
                         <h2>{selected.title}</h2>
                         <p
                             style={{
                                 marginTop: "10px",
                             }}
                         >Custom information about this marker</p>
                         <Button
                             onClick={function (e) {
                                 e.preventDefault();
                                 navigate(ROUTES.EVENT_DETAILS.replace(":id", selected.id));
                             }}
                             sx={{
                                 px: 1,
                                 py: 0.5,
                                 borderRadius: 50,
                                 fontSize: {xs: 14, md: 16},
                                 fontWeight: 700,
                                 textTransform: "capitalize",
                                 color: "text.primary",
                                 boxShadow: 0,
                                 "&:hover": {
                                     backgroundColor: "primary.main",
                                     color: "info.main",
                                     boxShadow: 0,
                                 },
                             }}
                             style={{
                                 backgroundColor: "info.main",
                                 color: "text.primary",
                                 marginBlock: "auto",
                                 marginTop: "10px",
                             }}
                             variant="contained"
                             color="info"
                         >
                             Join
                         </Button>
                     </div>
                 </Popup>
             ) : null}

      </Map></div>
    
  );
}

export default MapBox;
