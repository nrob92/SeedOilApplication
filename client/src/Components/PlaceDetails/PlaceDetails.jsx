import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";
import "../PlaceDetails/placeDetailsStyle.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import useMediaQuery from "@mui/material/useMediaQuery";

const PlaceDetails = ({ place, selected, refProp }) => {
  const matches = useMediaQuery("(max-width:700px)");

  if (selected) {
    const element = refProp?.current;
    if (element) {
      element.scrollIntoView({ passive: true });
    }
  }

  let backgroundColor;
  if (place.userRating <= 2) {
    backgroundColor = "rgb(255,153,153)";
  } else if (place.userRating <= 3.5) {
    backgroundColor = "rgb(255,193,153)";
  } else if (place.userRating > 3.5) {
    backgroundColor = "rgb(153,204,153)";
  }
  return (
    <Card
      style={{ backgroundColor, width: "100%" }}
      ref={refProp}
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 2,
      }}
    >
      <img
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        title={place.name}
        src={
          place.photos
            ? place.photos[0]
            : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
        }
      />
      <CardContent sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Price</Typography>
          <Rating
            name="text-feedback"
            value={place.price || 0}
            readOnly
            precision={0.5}
            icon={<AttachMoneyIcon fontSize="inherit" />}
            emptyIcon={<AttachMoneyIcon fontSize="inherit" />}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {place.userRating ? (
            <>
              <Typography variant="subtitle2">User Rating</Typography>
              <Rating
                value={Number(place.userRating) || 0}
                precision={0.5}
                readOnly
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle2">Rating</Typography>
              <Rating
                value={Number(place.rating) || 0}
                precision={0.5}
                readOnly
              />
            </>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Address</Typography>

          <Typography variant="subtitle2" fontSize="10px" color="textSecondary">
            <LocationOnIcon /> {place.address}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Phone</Typography>

          <Typography gutterBottom variant="subtitle2" color="textSecondary">
            <PhoneIcon /> {place.phone}
          </Typography>
        </Box>

        {place?.tags?.length ? (
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={1}
            mb={1}
          >
            <Typography variant="subtitle1">Tags:</Typography>

            {place?.tags?.map((tag, i) => {
              return (
                <Typography
                  key={i}
                  gutterBottom
                  variant="subtitle2"
                  color="textSecondary"
                >
                  {tag},
                </Typography>
              );
            })}
          </Stack>
        ) : undefined}

        <button
          className="btn-card"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </button>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
