const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2,
  }, 
  lastName: {
    type: String,
    required: true,
  }, 
   emailId: {
    type: String,
    required: true,
    unique: true,
    //unique is bydefault indexing auto
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email id ")

      }
    }
  }, 
   password: {
    type: String,
    required: true,
     validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("enter a strong password ")
      }}
  },
   age: {
    type: Number,
    min: 18,
  },
   gender: {
    type: String,
    validate(value){
      if(!["male", "female",  "others"].includes(value)){
        throw new Error("gender data is not valid")
      }
    }
  },
  about: {
    type: String,
    default: "this is a default about of the user"
  },


},  {
timestamps: true,
  });

  userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id},"Jassu@123al",{expiresIn: "7d"});

    return token;
    
  };

  userSchema.methods.validatePassword = async function (passwordINputByUser){
    const user = this ;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordINputByUser, passwordHash);

    return isPasswordValid;
  }
const User =mongoose.model('User', userSchema);
module.exports = User;