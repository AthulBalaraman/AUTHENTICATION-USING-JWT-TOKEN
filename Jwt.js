const { sign, verify } = require("jsonwebtoken");

// sign() => A function from jsonwebtoken to create tokens,
//  It takes three arguments :
//    1: Payload (What we are going to store inside this token)
//    2: Secret ( To keep your token secure = a random string of letters and numbers )
//    3: Expiration date

// A token is an object with information.
// The data inside that object is called the PAYLOAD
// Token is secure because it is completely encrypted
// We can store whatever we need inside that token

const createTokens = (user) => {

  // Generationg token

  const accessToken = sign(
    { username: user.username, id: user._id },
    "jwtsecret959679"
  );
  return accessToken;
};


module.exports = {createTokens}