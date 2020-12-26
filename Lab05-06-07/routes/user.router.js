const { Router } = require("express");
const protected = require("../middlewares/jwt.middleware");
const User = require("../models/user.model");
const { encrypt } = require("../utils/hash");

const router = new Router();

// All we do at this module is getting a list of user phones actually. Nothing interesting.
router.post("/phone", protected, async (req, res, next) => {
  try {
    const { _id } = req.user;
    let { phone } = req.body;
    phone = encrypt(phone);

    await User.updateOne({ _id }, { phone });

    res.json({ status: 200 });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
