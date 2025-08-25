const express = require("express")
const {userAuth} = require("../middlewares/auth")
const {validateEditProfileData, validatePassword} = require("../utils/validation")
const bcrypt = require("bcrypt")

const profileRouter = express.Router();

profileRouter.get("/profile",userAuth, async(req, res) =>{
 try {
  const user = req.user;
  res.send(user)
 } catch (err) {
   res.status(400).send("ERROR : " + err.message)
 }
})
 
profileRouter.patch("/profile/edit",userAuth, async (req, res) =>{
  try {
    //validateprofileeditdata----------
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit ")
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) =>(loggedInUser[key] = req.body[key]))
    await loggedInUser.save();
    res.json({message:`${loggedInUser.firstName}, your profile update successfuly`, data: loggedInUser})
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
    
  }
})

profileRouter.patch("/profile/password",userAuth, async (req, res) =>{
  try {
    //valdatereqbody 
    if(!validatePassword(req)){
      throw new Error("invalid changed password")
    }
    const loggedInUser =req.user
//compare old password
  const isMatch = await bcrypt.compare(oldPassword, user.password)
    
  } catch (err) {
    res.status(400).send("ERROR: " + err.message)
    
  } 
})

module.exports = profileRouter;