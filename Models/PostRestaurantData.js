const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postRestaurantData = new Schema(
  {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    photos: {
      type: Array,
    },
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    placeId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    open: {
      type: String,
    },
    hours: {
      type: Array,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RestaurantData", postRestaurantData);
