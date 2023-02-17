import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import AppContext from "../../Contexts/AppContext";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import {
  Divider,
  Stack,
  Box,
  CardHeader,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import Tags from "../Tags/Tags";
import AlertComponent from "./Alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import FileBase64 from "react-file-base64";

const FormModal = ({ place, setOpen }) => {
  const matches = useMediaQuery("(max-width:700px)");
  const [userRating, setUserRating] = React.useState(0);
  const [select, setSelect] = React.useState("");
  const [input, setInput] = React.useState("");
  const [imgFile, setImgFile] = React.useState("");
  const [formLoading, setFormLoading] = React.useState(false);
  const { setSeedOilData, restaurantData, tagValue, setTagValue } =
    React.useContext(AppContext);

  const generateError = (error) =>
    toast.error(error, {
      theme: "dark",
      position: toast.POSITION.TOP_RIGHT,
      toastId: "success4",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRating === 0 || userRating === null) {
      generateError("Rating Required!");
    } else {
      postSeedOilData(input, select, userRating, imgFile);
      console.log("uploaded");
    }
  };

  const postSeedOilData = async (input, select, userRating, imgFile) => {
    try {
      setFormLoading(true);
      const responseUser = await axios.get(
        `${process.env.REACT_APP_LOCAL_HOST}/getUser`,
        {
          withCredentials: true,
        }
      );
      const userName = await responseUser.data.user;

      const seedOilData = await axios.post(
        `${process.env.REACT_APP_LOCAL_HOST}/postSeedOilData`,
        {
          select,
          input,
          userRating,
          imgFile,
          user: userName,
          id: place._id,
          tags: tagValue,
        }
      );

      setSeedOilData([seedOilData.data, ...restaurantData]);
      setInput("");
      setSelect("");
      setImgFile("");
      setTagValue("");
      setFormLoading(false);
      setOpen(false);
    } catch (error) {}
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: matches ? 0 : 3,
      }}
    >
      {formLoading ? (
        <div style={{ display: "block", height: "400px" }}>
          <CircularProgress size={"275px"} />
        </div>
      ) : (
        <form
          style={{
            borderRadius: "5px",

            maxWidth: "600px",
            width: "100%",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <Card elevation={10} sx={{ p: 2 }}>
            <CardHeader
              sx={{ padding: "5px, 0,5px,0" }}
              action={
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTagValue("");
                    setOpen(false);
                  }}
                >
                  X
                </button>
              }
              title={place.name}
            />
            <Stack
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              gap={1}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2">Rating</Typography>
                <Rating
                  label="required"
                  name="simple-controlled"
                  value={userRating}
                  onChange={(event, newValue) => {
                    setUserRating(newValue);
                  }}
                />
              </Stack>

              <AlertComponent userRating={userRating} />
              <Divider sx={{ borderBottomWidth: "3px" }} />
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Select Proof Of Claim
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Proof of Claim"
                  value={select}
                  name="select"
                  onChange={(event) => {
                    setSelect(event.target.value);
                  }}
                >
                  <MenuItem value={"Visible Kitchen"}>Visible Kitchen</MenuItem>
                  <MenuItem value={"Kitchen Confirmed"}>
                    Kitchen Confirmed
                  </MenuItem>
                  <MenuItem value={"In Writing"}>Asked Staff</MenuItem>
                  <MenuItem value={"In Writing"}>In Writing</MenuItem>
                </Select>
              </FormControl>
              <Divider sx={{ borderBottomWidth: "3px" }} />

              <TextField
                sx={{ p: 0 }}
                id="outlined-basic"
                label="Report Proof Of Claim"
                variant="outlined"
                name="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Divider sx={{ borderBottomWidth: "3px" }} />
              <Tags />
              <Divider sx={{ borderBottomWidth: "3px" }} />
              <div className="input-file">
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setImgFile(base64)}
                />
              </div>
              {imgFile && <Alert>Image Uploaded!</Alert>}

              <button
                style={{ width: "100%", maxWidth: "300px", margin: "auto" }}
                type="submit"
              >
                Submit
              </button>
            </Stack>
          </Card>
        </form>
      )}
    </Box>
  );
};

export default FormModal;
