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

module.exports ={validateSignUpData}
