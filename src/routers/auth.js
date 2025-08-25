const express = require("express")

const authRouter = express.Router();
const User = require("../models/user")
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken")


authRouter.post('/signup', async(req, res)=>{
  console.log(req.body)
  
  // creating instaances of the User model req.body return js obj
try {
  const {firstName, lastName, emailId, password} = req.body
  //valdation  of data
  validateSignUpData(req);
  //encrypt our password
  const passwordHash = await bcrypt.hash(password,10);


  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  await user.save();
  res.send("user is crreated successfully")
} catch (err) {
  res.status(400).send("ERROR : " + err.message);
  
}
})

authRouter.post ("/login", async(req, res) =>{
  try {
    const {emailId, password} = req.body
    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("invalid creadentials")
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password)
   const isPasswordValid = await user.validatePassword(password)

    if(isPasswordValid){
     //create a jwt token
      // const token = await jwt.sign({_id: user._id},"Jassu@123al",{expiresIn: "7d"})
     const token = await user.getJWT();

      // console.log(token);
     //add the token to cookies and send the rsponse back to user 
     res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)})
      res.send("login successfully ....")
    } else{
      throw new Error("invalid creadentials")
    }
    
  } catch (err) {
    res.status(400).send("ERROR : " + err.message)
    
  }
})

authRouter.post("/logout", async (req, res) =>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("user is logout")
})

module.exports = authRouter;