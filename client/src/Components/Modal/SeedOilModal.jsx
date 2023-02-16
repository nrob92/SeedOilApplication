import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Box, Modal, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AlertComponent from "./Alert";
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SeedOilModal({ place, setSeedOilModal }) {
  const matches = useMediaQuery("(max-width:700px)");
  const [imgOpen, setImgOpen] = React.useState(false);
  const handleImgOpen = () => setImgOpen(true);
  const handleImgClose = () => setImgOpen(false);

  return (
    <>
      <Card
        sx={{
          p: matches ? 1.5 : 3,
          height: "100%",
        }}
      >
        <CardHeader
          sx={{ p: 1 }}
          action={<button onClick={() => setSeedOilModal(false)}>X</button>}
          title={place.name}
          subheader={place.address}
        />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">User Rating</Typography>
          <Rating
            size="small"
            precision={0.5}
            value={Number(place.userRating)}
            readOnly
          ></Rating>
        </Stack>

        <Box>
          <ImageList
            border="2px solid"
            variant="masonry"
            sx={{
              display: "flex",
              width: "100%",
              mb: 1,
            }}
          >
            {place.photos.map((item, i) => (
              <ImageListItem key={i}>
                <img
                  style={{
                    border: "2px solid",
                    height: matches ? "150px" : "200px",
                    objectFit: "cover",
                    width: "200px",
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

        <AlertComponent place={place} />
        <Stack
          width="100%"
          marginTop={1}
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          {place.select && (
            <Alert sx={{ p: 0 }} severity="success">
              User Input: {place.select}
            </Alert>
          )}
          <Alert sx={{ p: 0 }} severity="success">
            Contacted by Username: {place.user}
          </Alert>
          {place.input && (
            <div
              style={{
                wordBreak: "break-all",
                height: "100%",
                maxHeight: matches ? "100px" : "200px",
                maxWidth: "600px",
                overflow: "auto",
                scrollbarWidth: "1px",
              }}
            >
              <Alert sx={{ p: 0 }} severity="success">
                User description: {place.input}
              </Alert>
            </div>
          )}

          {place.imgFile && (
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Alert severity="success">Email Proof:</Alert>

              <div>
                <img
                  onClick={handleImgOpen}
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    maxWidth: matches ? "100px" : "200px",
                    height: matches ? "100px" : "200px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  src={place.imgFile}
                />
              </div>
              <Modal
                open={imgOpen}
                onClose={handleImgClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img
                    style={{
                      objectFit: "cover",
                      maxWidth: matches ? "300px" : "800px",
                      maxHeight: matches ? "450px" : "600px",
                    }}
                    src={place.imgFile}
                  />
                </Box>
              </Modal>
            </Stack>
          )}
        </Stack>
      </Card>
    </>
  );
}
