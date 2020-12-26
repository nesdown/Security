const mongoose = require("mongoose");

// this one is our connection interface to do different things
const connectDB = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/security", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB Connected");
  } catch (e) {
    console.log("DB Error", e);
  }
};

// this one is being used in index
module.exports = connectDB;
