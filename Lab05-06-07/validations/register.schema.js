const Joi = require("joi");

const schema = Joi.object({
  // has to be alphanumeric
  username: Joi.string().alphanum().required(),
  // has to have a minimum amount of 8
  password: Joi.string().min(8).required(),
  // has to be same to password 
  repeatPassword: Joi.string().required().valid(Joi.ref("password")),
});

module.exports = schema;
