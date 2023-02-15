import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import Map from "../Components/Map/Map";
import List from "../Components/List/List";
import { AppContext } from "../Contexts/AppContext";
import { Stack } from "@mui/system";
import { haversine } from "../api/haversine";
import axios from "axios";
import { toast } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {
    setLoggedIn,
    filteredPlaces,
    setFilteredPlaces,
    rating,
    search,
    restaurantData,
    searchTag,
    sort,
    setSort,
    coords,
    footerTag,
  } = useContext(AppContext);

  // checks to see if youre logged in

  useEffect(() => {
    const verifyUser = async () => {
      const token = cookies.jwt;
      if (!token) {
        navigate("/");
      } else {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_LOCAL_HOST}/checkuser`,
            { withCredentials: true }
          );
          if (!data.status) {
            removeCookie("jwt");
            navigate("/");
          } else {
            setLoggedIn(true);
            toast.success(`Hi ${data.user} 🦄`, {
              theme: "dark",
              toastId: "success1",
            });
          }
        } catch (err) {
          console.log(err);
          removeCookie("jwt");
          navigate("/");
        }
      }
    };
    verifyUser();
  }, []);

  // filter data from api depending on your search
  useEffect(() => {
    let isMounted = true;
    let filteredPlaces = [...restaurantData];

    if (sort === "best") {
      filteredPlaces = filteredPlaces.filter(
        (place) => place.userRating !== undefined && place.userRating > 3
      );
      filteredPlaces.sort((a, b) => b.userRating - a.userRating);
    }
    if (sort === "worst") {
      filteredPlaces = filteredPlaces.filter(
        (place) => place.userRating !== undefined && place.userRating <= 3
      );
      filteredPlaces.sort((a, b) => a.userRating - b.userRating);
    }
    if (sort === "recent") {
      filteredPlaces.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sort === "nearby") {
      filteredPlaces.sort(
        (a, b) =>
          haversine(coords.lat, coords.lng, a.lat, a.lng) -
          haversine(coords.lat, coords.lng, b.lat, b.lng)
      );
    }
    if (sort === "none") {
      setSort("");
    }

    if (search)
      filteredPlaces = filteredPlaces.filter((place) =>
        place.name.toLowerCase().startsWith(search.toLowerCase())
      );
    if (searchTag)
      filteredPlaces = filteredPlaces.filter((place) =>
        place?.tags?.find((tag) =>
          tag.toLowerCase().startsWith(searchTag.toLowerCase())
        )
      );
    if (footerTag)
      filteredPlaces = filteredPlaces.filter((place) =>
        place.tags?.includes(footerTag)
      );

    filteredPlaces = filteredPlaces.filter((place) => place.rating > rating);

    if (isMounted) {
      setFilteredPlaces(filteredPlaces);
    }
    return () => {
      isMounted = false;
    };
  }, [search, rating, searchTag, restaurantData, sort, coords, footerTag]);

  return (
    <div className="home-container">
        <List places={filteredPlaces} />
        <Map places={filteredPlaces} />
      <ToastContainer />
    </div>
  );
};
export default Home;
