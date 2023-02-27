const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    min:3,
    max:30,
    unique:true
    },
    password:{
      type:String,
      required:true,
      min:3,
    }
})


module.exports = mongoose.model("Users",UserSchema)