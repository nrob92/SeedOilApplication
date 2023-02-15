import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "../Map/mapStyles.css";
import mapStyles from "./mapStyles";
import AppContext from "../../Contexts/AppContext";
import { useContext } from "react";
import axios from "axios";
import PlacesMap from "../PlacesMap/PlacesMap";
import { CircularProgress,useMediaQuery } from "@mui/material";

const Map = ({ places }) => {
  const matches = useMediaQuery("(max-width:700px)");
  const {
    setCoords,
    coords,
    setChildClicked,
    seedOilData,
    setRestaurantData,
    isLoading,
  } = useContext(AppContext);
  useEffect(() => {
    const getRestaurantData = async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_LOCAL_HOST}/getRestaurantData`
      );
      setRestaurantData(response.data);
    };
    getRestaurantData();
  }, [seedOilData]);
  //gets your current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={coords}
          defaultZoom={11}
          options={{
            styles: mapStyles,
            keyboardShortcuts: false,
            zoomControl: false,
            fullscreenControl: false,
          }}
          onChildClick={(child) => {
            setChildClicked(child);
          }}
        >
          {places.map((place, i) => {
            return (
              <PlacesMap
                lat={Number(place.lat)}
                lng={Number(place.lng)}
                key={i}
                place={place}
              />
            );
          })}
        </GoogleMapReact>
      </div>
      {isLoading && matches && (
        <CircularProgress
          size={"250px"}
          lat={Number(coords.lat)}
          lng={Number(coords.lng)}
        />
      )}
    </>
  );
};

export default Map;
