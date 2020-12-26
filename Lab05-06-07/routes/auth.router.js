// Init the modules
const { Router } = require("express");
const bcrypt = require("bcrypt");
const { jwtSign } = require("../utils/jwt");

// Init the schemas and models 
const registerSchema = require("../validations/register.schema");
const loginSchema = require("../validations/login.schema");
const User = require("../models/user.model");
const router = new Router();

// for the post request to login, we:
router.post("/login", async (req, res, next) => {
  try {
    // validate the fields
    let { password, username } = await loginSchema.validateAsync(req.body);

    // checking if the user exists 
    const user = await User.findOne({
      username,
    });

    // else throwing an error
    if (!user) {
      throw new Error("User not found");
    }

    // if the password is same, we are providing some logic 
    isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      // in case it's fine, we create a temporary token
      const token = jwtSign({ _id: user._id, username: user.username });

      // and a a response write jwt token to cookies
      res
        .cookie("jwt", token, {
          httpOnly: true,
        })
        .json({ token });
    } else {
      throw new Error("username or email is not valid");
    }
  } catch (e) {
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // for the register, validate again
    let { password, username } = await registerSchema.validateAsync(req.body);

    // password is being encrypted 
    password = await bcrypt.hash(password, 12);

    // and finally we can create a new entrance to the database
    const { _id } = await new User({
      password,
      username,
    }).save();

    // here we are creating a token again and saving it
    const token = jwtSign({ _id, username });

    res
      .cookie("jwt", token, {
        httpOnly: true,
      })
      .json({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
