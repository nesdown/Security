const { Router } = require("express");
const protected = require("../middlewares/jwt.middleware");
const User = require("../models/user.model");
const router = new Router();
const { decrypt } = require("../utils/hash");

// These are just responsible for rendering pages 
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// In a profile, we set an iterator over the users where decrypt their phones 
router.get("/profile", protected, async (req, res) => {
  let users = await User.find(
    {},
    {
      username: 1,
      phone: 1,
    }
  );

  users.forEach((user) => {
    user.phone = decrypt(user.phone);
  });

  res.render("profile", {
    users,
  });
});

module.exports = router;
