import React, { useState, useEffect, createRef, useContext } from "react";
import Box from "@mui/material/Box";
import "../List/listStyle.css";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import AppContext from "../../Contexts/AppContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const List = ({ places }) => {
  const [elRefs, setElRefs] = useState([]);
  const matches = useMediaQuery("(max-width:700px)");

  const {
    childClicked,
    isLoading,
    rating,
    setRating,
    setSearch,
    search,
    showListView,
    setShowListView,
    searchTag,
    setSearchTag,
    sort,
    setSort,
  } = useContext(AppContext);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  useEffect(() => {
    if (!matches) {
      setShowListView(false);
    }
  }, [matches]);
  const handleListView = () => {
    setShowListView(false);
    setSort("");
  };

  const handleMouseDown = (event) => {
    setRating(event.target.value);
  };

  return (
    <Box p={1} className={showListView ? "list-show" : "list-view"}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Restaurants</Typography>
        {showListView ? <button onClick={handleListView}>X</button> : undefined}
      </Stack>

      {isLoading ? (
        <div className="loading">
          <CircularProgress size={"275px"} />
        </div>
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Rating</InputLabel>

            <Stack
              m={1}
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Select
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "80px",
                  height: "40px",
                }}
                displayEmpty
                inputProps={{ "aria-label": "Select option" }}
                label="Rating"
                value={rating}
                onChange={handleMouseDown}
              >
                <MenuItem value={0}>all</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
              <input
                className="list-input"
                type="text"
                value={search}
                placeholder="name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                className="list-input"
                type="text"
                value={searchTag}
                placeholder="tags"
                onChange={(e) => setSearchTag(e.target.value)}
              />
            </Stack>
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>

              <Select
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
                labelId="sort"
                id="sort"
                value={sort}
                label="sort"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="none">none</MenuItem>
                <MenuItem value="best">Best</MenuItem>
                <MenuItem value="worst">worst</MenuItem>
                <MenuItem value="recent">Recent</MenuItem>
                <MenuItem value="nearby">Nearby</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            height="600px"
            overflow="auto"
          >
            {places?.map((place, i) => (
              <PlaceDetails
                key={i}
                place={place}
                selected={Number(childClicked) === i}
                refProp={elRefs[i]}
              />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default List;
