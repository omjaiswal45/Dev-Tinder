const validator = require("validator")

const validateSignUpData = (req) =>{
  const{firstName, lastName, emailId, password} = req.body;
  if(!firstName || !lastName) {
    throw new Error("name is required")
  } else if(!validator.isEmail(emailId)){
    throw new Error("emailid is not valid")
  } else if(!validator.isStrongPassword(password)){
    throw new Error ("please enter a strong password")
  }
};

const validateEditProfileData = (req) => {
  const allowEditFileds = ["firstName", "lastName", "emailId", "age", "about","gender"];
  const isEditAllow =Object.keys(req.body).every(field => allowEditFileds.includes(field));
  return isEditAllow;
}

const validatePassword = (req) =>{
  const{oldPassword, newPassword} = req.body;
  if(!oldPassword || !newPassword){
    throw new Error("both old &new password are required")
  } else if(!validator.isStrongPassword(newPassword)){
    throw new Error ("please enter a strong password")
  }
}

module.exports ={validateSignUpData,
validateEditProfileData, validatePassword}
module.export  = {validateSignUpData }
