// We are using crypto library
const crypto = require("crypto");

// This one is kinda random but set in a file 
const ENCRYPTION_KEY = process.env.DATA_SECRET;
// Initialization vector length
const IV_LENGTH = 16;

function encrypt(text) {
  // Init Vector key is always random
  let iv = crypto.randomBytes(IV_LENGTH);

  // and we are actually creating a cipher object
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  // provide the ciphering here
  let encrypted = cipher.update(text);
  
  // finalizing the data and returning the init vector and encrypted text in hex
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  // prepare the text in a split modules
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");

  // generate the encrypted record and feeding it to the decipher of crypto 
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // and also it we can return it - maybe someone would not only comment this... 
  return decrypted.toString();
}

module.exports = { decrypt, encrypt };
