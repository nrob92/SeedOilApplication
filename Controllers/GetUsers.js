const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.getUser =  (req, res, next) => {
  const token =  req.cookies.jwt;
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
          if (user)
            res.json({
              status: true,
              user: user.username,
              id: user._id,
              email: user.email,
            });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};
