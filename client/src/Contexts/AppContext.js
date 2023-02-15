import React, { createContext, useState } from "react";
//import { getPlacesData } from "../api";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [search, setSearch] = useState("");
  const [seedOilData, setSeedOilData] = useState([]);
  const [photos, setPhotos] = useState("");
  const [namePlace, setNamePlace] = useState("");
  const [restaurantData, setRestaurantData] = useState([]);
  const [allValues, setAllValues] = useState({});
  const [allData, setAllData] = useState([]);
  const [userRegistered, setUserRegistered] = useState(false);
  const [sectionRef, setSectionRef] = useState(null);
  const [showList, setShowList] = useState("");
  const [showListView, setShowListView] = useState(false);
  const [tagValue, setTagValue] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [sort, setSort] = useState("");
  const [footerTag, setFooterTag] = useState("");

  const value = {
    loggedIn,
    setLoggedIn,
    coords,
    setCoords,
    filteredPlaces,
    setFilteredPlaces,
    places,
    setPlaces,
    childClicked,
    setChildClicked,
    isLoading,
    setIsLoading,
    rating,
    setRating,
    search,
    setSearch,
    setSeedOilData,
    seedOilData,
    photos,
    setPhotos,
    namePlace,
    setNamePlace,
    allValues,
    setAllValues,
    restaurantData,
    setRestaurantData,
    allData,
    setAllData,
    userRegistered,
    setUserRegistered,
    sectionRef,
    setSectionRef,
    showList,
    setShowList,
    showListView,
    setShowListView,
    tagValue,
    setTagValue,
    searchTag,
    setSearchTag,
    sort,
    setSort,
    footerTag,
    setFooterTag,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
