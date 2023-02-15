const RestaurantData = require("../Models/PostRestaurantData");

module.exports.getRestaurantData = async (req, res) => {
  try {
    const data = await RestaurantData.find();
    res.json(data);

    //res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

