const adminAuth = (req, res, next) =>{
  console.log("yes middleware work here for admin")
  const token = "abc"
  const isAdminAuthorized = token ==="abc";
  if(!isAdminAuthorized){
    res.status(404).send("unauthorized request")
  }
  else{
    next();
  }
};

// user Auth....................................
const userAuth = (req, res, next) =>{
  console.log("yes middleware work here for user")
  const token = "xyz"
  const isAdminAuthorized = token ==="xyz";
  if(!isAdminAuthorized){
    res.status(404).send("unauth user request")
  }
  else{
    next();
  }
};


module.exports ={
  adminAuth,
  userAuth,
}; 