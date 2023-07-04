const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");

const maxAge = 15 * 24 * 60 * 60 * 1000;

// Create Token
module.exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// Check and verify token
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.authToken;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let result = await user.findById(decodedToken.id);
        res.locals.user = result;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
