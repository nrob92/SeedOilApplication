import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Stack, Box, Checkbox, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import AppContext from "../../Contexts/AppContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainModal = ({ place, setOpen, openModalRating, setOpenModalRating }) => {
  const [userName, setUserName] = useState("");
  const toggleModals = () => {
    setOpenModalRating(!openModalRating);
    setAllData("");
  };
  const matches = useMediaQuery("(max-width:700px)");
  const { setSeedOilData } = useContext(AppContext);
  const [allData, setAllData] = useState("");

  const postUserData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_HOST}/getUser`,
        {
          withCredentials: true,
        }
      );
      setUserName(response.data.user);
      const userName = await response.data.user;
      const userData = await axios.post(
        `${process.env.REACT_APP_LOCAL_HOST}/postUserData`,
        {
          user: userName,
          id: place._id,
        }
      );
      setSeedOilData(userData.data);
      setAllData([...allData, userName]);
    } catch (error) {
      console.error(error);
    }
  };

  let concatenatedName = place.name.replace(/\s+/g, "");
  const handleClick = () => {
    const recipient = place.email
      ? place.email
      : `info@${concatenatedName.toLowerCase()}.com`;
    const subject = "Cooking oil inquiry for allergy?";
    const body =
      "Hi,\n\nA member of my party is allergic to many common cooking oils (canola,vegetable,grapeseed,sunflower,soybean), but they are fine with olive/avocado/coconut oil, butter and animal fats.\nWas wondering how they should best navigate the menu, areany of these oils in your sauces/aiolis or used to cook proteins? Anything to avoind in particular?\nThank you!";
    const encodedEmailBody = encodeURIComponent(body);
    const emailLink = `mailto:${recipient}?subject=${subject}&body=${encodedEmailBody}`;
    window.location.href = emailLink;
  };
  const imgSlice = matches
    ? place.photos.slice(0, 3)
    : place.photos.slice(0, 4);

  return (
    <>
      {place.email ? (
        <Alert sx={{ fontSize: 15 }} severity="success">
          Email Found!
        </Alert>
      ) : undefined}
      <Card sx={{ p: matches ? 2 : 3, pb: matches ? 3 : 2 }}>
        <CardHeader
          sx={{ p: 1}}
          action={<button onClick={() => setOpen(false)}>X CLOSE</button>}
          title={place.name}
          subheader={place.address}
        />
        <Rating
          size="small"
          precision={0.5}
          value={Number(place.rating)}
          readOnly
        ></Rating>
         <Box mb={2} >
          <ImageList
          className="scroll"
            border="2px solid"
            variant="masonry"
            sx={{
              display:"flex",
              width: "100%",
              mb: 1,
            }}
          >
            {place.photos.map((item, i) => (
              <ImageListItem key={i}>
                <img
                  style={{
                    border: "2px solid",
                   height:"150px",
                   objectFit:"cover",
                   width:"200px"
                  }}
                  src={`${item}?w=248&fit=crop&auto=format`}
                  srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={place.name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <Alert style={{ padding: matches ? 0 : 2 }} severity="error">
          Assume the worst, nearly all restaraunts use seed oils.
        </Alert>

        {place.user || userName ? (
          <Stack direction="row" alignItems="center">
            <Checkbox disabled={true} defaultChecked color="primary" />
            <Typography variant="subtitle2">
              contacted by {allData}
              {place.user}
            </Typography>
          </Stack>
        ) : (
          <form onSubmit={postUserData}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox
                onChange={(event) => {
                  if (event.target.checked) {
                    postUserData(event);
                  }
                }}
              />
              <Typography variant="subtitle2" fontSize="10px">
                Check box if you have already contacted the restaurant.
              </Typography>
            </div>
          </form>
        )}
        <Stack
          marginTop={2}
          direction={{ xs: "row", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <button
            style={{ fontSize: matches ? "10px" : "", padding: 9 }}
            onClick={toggleModals}
          >
            File Report
          </button>
          <button style={{ fontSize: matches ? "10px" : "", padding: 9 }}>
            {place.phone}
          </button>

          <button
            style={{ fontSize: matches ? "10px" : "", padding: 9 }}
            onClick={handleClick}
          >
            Send Email
          </button>

          <button
            style={{ fontSize: matches ? "10px" : "", padding: 9 }}
            onClick={() => {
              window.open(place.website, "_blank");
            }}
          >
            Website
          </button>
        </Stack>
      </Card>
    </>
  );
};

export default MainModal;
