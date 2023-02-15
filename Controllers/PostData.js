const RestaurantData = require("../Models/PostRestaurantData");

module.exports.postSeedOilData = async (req, res) => {
  try {
    const { select, input, userRating, user, tags, imgFile, id } = req.body;

    require("mongoose").model("RestaurantData").schema.add({
      select: String,
      input: String,
      userRating: Number,
      imgFile: String,
      user: String,
      tags: Array,
    });
    const userId = await RestaurantData.findById(id);

    const seedOilData = await RestaurantData.findByIdAndUpdate(userId, {
      select: select,
      input: input,
      userRating: userRating,
      imgFile: imgFile,
      user: user,
      tags: tags,
    });

    res.status(200).json(seedOilData);
  } catch (err) {
    console.log(err);
  }
};

module.exports.postUserData = async (req, res) => {
  try {
    const { user, id } = req.body;

    require("mongoose").model("RestaurantData").schema.add({
      user: String,
    });
    const userId = await RestaurantData.findById(id);

    const userData = await RestaurantData.findByIdAndUpdate(userId, {
      user: user,
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
  }
};

module.exports.postRestaurantData = async (req, res) => {
  try {
    const {
      lat,
      lng,
      photos,
      name,
      rating,
      website,
      address,
      phone,
      placeId,
      price,
      open,
      hours,
      email,
    } = req.body;

    const doc = await RestaurantData.findOne({ placeId: placeId });
    if (!doc) {
      const restaurantData = await RestaurantData.create({
        lat,
        lng,
        photos,
        name,
        rating,
        website,
        address,
        phone,
        placeId,
        price,
        open,
        hours,
        email,
      });
      res.status(200).json(restaurantData);
      // doc with existing_id already exists, do something else
    } else {
      // doc with existing_id created successfully
    }
  } catch (err) {
    console.log(err);
  }
};
