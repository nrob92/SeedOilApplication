const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.deleteUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      `${process.env.REACT_APP_SECRET_KEY}`,
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) {
            await user.remove();
            res.json({ status: true, message: "User deleted successfully" });
          } else {
            res.json({ status: false });
          }
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};
