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


const validateToken = (req,res,next)=>{
  const accessToken = req.cookies["access-token"]
  if(!accessToken){
    return res.status(400).json({message:"User not authenticated ! "})
  }
    try {
      const validToken = verify(accessToken,"jwtsecret959679")
      if(validToken){
        req.authenticated = true // in Express you can create variabled like this
        return next()
      }
    } catch (error) {
      return res.status(400).json({message:error})
    }
  
}


module.exports = {createTokens, validateToken}