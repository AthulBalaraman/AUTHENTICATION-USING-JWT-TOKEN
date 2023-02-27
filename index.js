const express  =  require('express')
const app = express()
const PORT = 5000
const db = require('./config/db')
const bcrypt = require('bcrypt')
const User = require('./models/User')
const cookieParser = require('cookie-parser')
const {createTokens} = require('./Jwt')



app.use(express.json())
app.use(cookieParser())



db(()=>{
  try {
      console.log("DataBase Successfully Connected");        
  } catch (error) {
      console.log("Database Not Connected : ", error);        
  }
});


app.post('/register',async(req,res)=>{
  try {
    const {username, password} = req.body
    //Password hashed
    const hashedPassword = await bcrypt.hash(password,10)
   
    const newUser = new User({
      username:username,
      password:hashedPassword
    })
    // New user save
    const user = await newUser.save()
    res.status(200).json({user,message:"USER REGISTERED"})
    
  } catch (error) {
    res.status(500).json(error.message)
  }
})

app.post('/login',async(req,res)=>{
  const {username,password} = req.body
  const user = await User.findOne({username:username})
  !user && res.status(400).json({message:"user not found"})

  const dbPassword =  user.password
  await bcrypt.compare(password,dbPassword).then((match)=>{
    if(!match){
      res.status(400).json({message:"password incorrect"})
    }else{
      const accessToken = createTokens(user) // sending to create token

      // S toring cookie

      res.cookie("access-token",accessToken,{
        maxAge:60*60*24*30*1000 // cookie expires after 30 days
      })
      res.status(200).json({message:"Logged in"})
    }
  })
})

app.get('/profile',(req,res)=>{
  res.json("profile")
})


app.listen(PORT,()=>{
  console.log("PORT RUNNING")
})