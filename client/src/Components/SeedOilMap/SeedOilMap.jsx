import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Typography, Box, Drawer } from "@mui/material";
import Rating from "@mui/material/Rating";
import SeedOilModal from "../Modal/SeedOilModal";
import useMediaQuery from "@mui/material/useMediaQuery";
const SeedOilMap = ({ place }) => {
  const matches = useMediaQuery("(max-width: 700px)");
  const [seedOilModal, setSeedOilModal] = React.useState(false);
  const [modal, setModal] = React.useState([]);
  const filterName = (name) => {
    setModal([name]);
    setSeedOilModal(true);
  };

  let backgroundColor;
  if (place.userRating <= 2) {
    backgroundColor = "rgba(255,0,0,.4)";
  } else if (place.userRating <= 3.5) {
    backgroundColor = "rgba(255,100,0,.4)";
  } else if (place.userRating > 3.5) {
    backgroundColor = "rgba(0,128,0,.4)";
  }

  let backgroundColorIcon;
  if (place.userRating <= 2) {
    backgroundColorIcon = "rgb(255,0,0)";
  } else if (place.userRating <= 3.5) {
    backgroundColorIcon = "rgb(255,100,0)";
  } else if (place.userRating > 3.5) {
    backgroundColorIcon = "rgb(0,128,0";
  }

  return (
    <div>
      <div onClick={() => filterName(place)} className="markerContainer">
        {matches ? (
          <div style={{ color: backgroundColorIcon }}>
            <LocationOnIcon fontSize="large" />
          </div>
        ) : (
          <div style={{ backgroundColor: "white", borderRadius: "5px" }}>
            <Paper
              style={{ backgroundColor: backgroundColor }}
              elevation={3}
              className="paper"
            >
              <Typography textAlign="center" fontSize={12} variant="subtitle2">
                {place.name}
              </Typography>
              <img
                style={{
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                  margin: "auto",
                }}
                src={
                  place
                    ? place.photos[0]
                    : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
                }
                alt={place.name}
                className="pointer"
              />
              <Rating
                size="small"
                precision={0.5}
                value={Number(place.userRating)}
                readOnly
              ></Rating>
            </Paper>
          </div>
        )}
      </div>
      {seedOilModal && (
        <>
          {modal.map((place, i) => {
            return (
              <Drawer
                open={seedOilModal}
                onClose={() => setSeedOilModal(false)}
                key={i}
                anchor="bottom"
              >
                <SeedOilModal setSeedOilModal={setSeedOilModal} place={place} />
              </Drawer>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SeedOilMap;
