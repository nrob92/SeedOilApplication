import React from "react";
import Alert from "@mui/material/Alert";

const AlertComponent = ({ place, userRating }) => {
  if (place?.userRating <= 1 || userRating <= 1) {
    return <Alert severity="error">TERRIBLE</Alert>;
  }
  if (place?.userRating <= 2.5 || userRating <= 2.5) {
    return <Alert severity="warning">BAD</Alert>;
  }
  if (place?.userRating <= 3.5 || userRating <= 3.5) {
    return <Alert severity="info">DESCENT</Alert>;
  }
  if (place?.userRating <= 4 || userRating <= 4) {
    return <Alert severity="success">GOOD</Alert>;
  }
  if (place?.userRating > 4 || userRating > 4) {
    return (
      <Alert variant="filled" severity="success">
        Best!!!
      </Alert>
    );
  }
};

export default AlertComponent;
