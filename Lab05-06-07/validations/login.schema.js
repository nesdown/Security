const Joi = require("joi");

// This one is pretty simple, just checking whether input data is a string
const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = schema;
