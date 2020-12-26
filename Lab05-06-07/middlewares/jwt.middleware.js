const jwt = require("jsonwebtoken");
const { findOneAndUpdate } = require("../models/user.model");
const SECRET = process.env.SECRET;

// Taking the token from cookies 
const protected = async (req, res, next) => {
  const token = req.cookies.jwt;

  // if got instanceof, try to check 
  if (token) {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        // in case of error, show it
        return res.render("login", { errors: ["Please Login First"] });
      } else {
        // else moving by generator next, defined in a local scope! 
        req.user = user;
        next();
      }
    });
  } else {
    // in case login was not found, moving to the authorization
    return res.render("login", { errors: ["Please Login First"] });
  }
};

module.exports = protected;
