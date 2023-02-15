const { register, login } = require("../Controllers/AuthControllers");
const { deleteUser } = require("../Controllers/DeleteUser");
const { getRestaurantData } = require("../Controllers/GetData");
const { getUser } = require("../Controllers/GetUsers");
const {
  postSeedOilData,
  postRestaurantData,
  postUserData,
} = require("../Controllers/PostData");
const { checkUser } = require("../Middlewares/AuthMiddlewares");


const router = require("express").Router();

router.get("/getUser", getUser);
router.delete("/deleteUser", deleteUser);
router.get("/getRestaurantData", getRestaurantData);
router.get("/checkuser", checkUser);
router.post("/register", register);
router.post("/login", login);
router.post("/postSeedOilData", postSeedOilData);
router.post("/postUserData", postUserData);
router.post("/postRestaurantData", postRestaurantData);

module.exports = router;
