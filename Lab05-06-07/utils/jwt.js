// This one is stupidly simple. Call a MSInputMethodContext, make a jwt sign, return a token. 

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// After login, we are giving user a temporary token for 10 mins, saved in cookies
const jwtSign = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "10m" });

  return token;
};

module.exports = {
  jwtSign,
};
