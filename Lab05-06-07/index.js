// This one is being used to get some variables from .env 
require("dotenv/config");

const express = require("express");

// This one would allow to parse request in middleware
const bodyParser = require("body-parser");


const app = express();
const cookieParser = require("cookie-parser");

// We are using Mongoose, and here are the routes created for the system  
const connectDB = require("./db");
const authRouter = require("./routes/auth.router");
const pagesRouter = require("./routes/pages.router");
const usersRouter = require("./routes/user.router");

// We are cool developers, so importing the port from env!
const PORT = process.env.PORT || 3000;

// And here we connect all the middlewares for the instance of Express 
// This two for any routes, I need 'em everywhere!
app.use(bodyParser.json());
app.use(cookieParser());

// And these are pretty specified...
app.use("/api", authRouter);
app.use("/api/users", usersRouter);
app.use("/", pagesRouter);

// Here we set up the views engine
app.set("view engine", "hbs");
// Layout is the one and the only
app.set("view options", { layout: "layouts/layout" });
app.set("views", __dirname + "/views");

// Simple error handlin
app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.log(error);
  return res.status(status).json({ error: error.toString() });
});

// Let this sh*t burn!! :)
app.listen(PORT, async () => {
  console.log(`App is listening on port ${PORT}`);
  await connectDB();
});
