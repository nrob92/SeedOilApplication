const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const cors = require("cors");



app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//app.use(express.static(path.join(__dirname, "public")));

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3000/",
  "http://localhost:3001",
  "http://localhost:3001/",
  "http://localhost:8080",
  "http://localhost:8080/",
  "https://seed-oil-app.herokuapp.com",
  "https://seed-oil-app.herokuapp.com/",
  "https://seed-oil-app-720be4aef1c6.herokuapp.com",
  "http://seed-oil-app.com",
  "https://seed-oil-app.com"
  
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  // Add this line to enable credentials
};

app.use(cors(corsOptions));

app.use("/", authRoutes);

const mongoDBPort = process.env.REACT_APP_MONGO_CONNECTION;

mongoose.set("strictQuery", false);

mongoose
  .connect(mongoDBPort, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//Serve any static files
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(process.env.PORT || 8080, () => {
  console.log("SERVER RUNNING");
});
