const { Schema, model } = require("mongoose");
const schema = require("../validations/register.schema");

// Simple schema, three fields, two of them are obligatory
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phone: {
    type: String,
  },
});

module.exports = model("User", UserSchema);
