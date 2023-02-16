import * as React from "react";
import { useContext, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { AppContext } from "../Contexts/AppContext";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  const {
    loggedIn,
    setLoggedIn,
    setAllValues,
    allValues,
    setRestaurantData,
    restaurantData,
    setCoords,
    setIsLoading,
    setSectionRef,
    showListView,
    setShowListView,
    setSort,
    setFooterTag,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const matches = useMediaQuery("(max-width:700px)");
  const location = useLocation();
  const [clear, setClear] = React.useState("");

  const logOut = () => {
    removeCookie("jwt");
    navigate("/");
    setLoggedIn(false);
  };
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = async () => {
    const lat = await autocomplete.getPlace().geometry.location.lat();
    const lng = await autocomplete.getPlace().geometry.location.lng();
    const photos = await autocomplete.getPlace().photos.map((x) => x.getUrl());
    const name = await autocomplete.getPlace().name;
    const rating = await autocomplete.getPlace().rating;
    const website = await autocomplete.getPlace().website;
    const address = await autocomplete.getPlace().formatted_address;
    const phone = await autocomplete.getPlace().formatted_phone_number;
    const placeId = await autocomplete.getPlace().place_id;
    const price = await autocomplete.getPlace().price_level;
    const open = await autocomplete.getPlace().current_opening_hours.open_now;
    const hours = await autocomplete
      .getPlace()
      .current_opening_hours.periods.map((hour) => hour);
    setCoords({ lat, lng });
    setAllValues({
      lat,
      lng,
      photos,
      name,
      rating,
      website,
      address,
      placeId,
      phone,
      price,
      open,
      hours,
    });
  };
  const URL =
    "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng";

  React.useEffect(() => {
    const sendData = async () => {
      if (allValues?.name?.length) {
        try {
          setIsLoading(true);

          let apiData = await axios.get(URL, {
            params: {
              latitude: allValues.lat,
              longitude: allValues.lng,
              limit: "1",
            },
            headers: {
              "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
              "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            },
          });
          const emailData = await apiData.data.data[0].email;

          let response = await axios.post(
            `${process.env.REACT_APP_LOCAL_HOST}/postRestaurantData`,
            {
              lat: allValues.lat,
              lng: allValues.lng,
              photos: allValues.photos,
              name: allValues.name,
              rating: allValues.rating,
              website: allValues.website,
              address: allValues.address,
              phone: allValues.phone,
              price: allValues.price,
              open: allValues.open,
              hours: allValues.hours,
              placeId: allValues.placeId,
              email: emailData,
            }
          );
          setRestaurantData([response.data, ...restaurantData]);
          setClear("");
          setIsLoading(false);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    sendData();
  }, [allValues]);

  const sectionAboutRef = "about";
  const sectionFaqRef = "faq";

  const handleShowList = () => {
    setShowListView(!showListView);
    setSort("");
    setFooterTag("");
  };
  return (
    <div
      className="nav-container"
      style={{
        height: matches && location.pathname === "/home" ? "150px" : "",
        top: matches && location.pathname === "/home" ? "0" : "10px",
      }}
    >
      <div
        style={{
          display:
            matches && location.pathname === "/profile" ? "none" : "flex",
        }}
        className={`navbar ${showNavbar ? "show" : "hide"}`}
      >
        <Typography
          display={matches && loggedIn ? "none" : "flex"}
          variant="h6"
          noWrap
          component="div"
          width="175px"
        >
          Seed Oil App
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent={matches && loggedIn ? "space-between" : "flex-end"}
          width="100%"
        >
          {loggedIn ? (
            <>
              <div
                style={{
                  display: location.pathname === "/profile" ? "none" : "flex",
                }}
              >
                <Search onChange={(e) => setClear(e.target.value)}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <StyledInputBase
                      value={clear}
                      style={{ minWidth: "300px" }}
                      placeholder="Location…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Autocomplete>
                </Search>
              </div>
              {!matches ? (
                <Stack direction="row">
                  <button onClick={() => navigate("/home")}>Home</button>
                  <button onClick={() => navigate("/profile")}>Profile</button>
                  <button onClick={logOut}>Logout</button>
                </Stack>
              ) : null}
            </>
          ) : (
            <Stack direction="row">
              <button onClick={() => navigate("/")}>Home</button>
              <button onClick={() => setSectionRef(sectionAboutRef)}>
                About
              </button>
              <button onClick={() => setSectionRef(sectionFaqRef)}>FAQ</button>
            </Stack>
          )}
        </Stack>
      </div>

      {matches && loggedIn && location.pathname !== "/profile" ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="home-page-nav"
          spacing={2}
        >
          <button className="show-list-btn" onClick={handleShowList}>
            List View
          </button>
          <button className="show-list-btn" onClick={() => setSort("best")}>
            Best
          </button>
          <button className="show-list-btn" onClick={() => setSort("worst")}>
            Worst
          </button>
          <button className="show-list-btn" onClick={() => setSort("none")}>
            No Filter
          </button>
        </Stack>
      ) : null}
    </div>
  );
}
