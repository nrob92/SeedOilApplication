const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      `${process.env.REACT_APP_SECRET_KEY}`,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.json({ status: false });
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) {
            res.json({ status: true, user: user.email });
          } else {
            res.json({ status: false });
          }
        }
      }
    );
  } else {
    res.json({ status: false });
  }
};
