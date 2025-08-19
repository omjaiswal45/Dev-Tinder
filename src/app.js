const express = require("express")
const bcrypt = require ("bcrypt")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")
const app = express();


const User = require("./models/user")
const connectDB = require("./config/database")
const {validateSignUpData} = require("./utils/validation")
app.use(express.json());
app.use(cookieParser())


app.post('/signup', async(req, res)=>{
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

//login api 

app.post ("/login", async(req, res) =>{
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

//profile api
app.get("/profile",userAuth, async(req, res) =>{
 try {
  const user = req.user;
  res.send(user)
 } catch (err) {
   res.status(400).send("ERROR : " + err.message)
 }
})

//feed api

app.get("/feed",userAuth, async(req,res) =>{
  try {
    const alluser = await User.find({});
    res.send(alluser)
    
  } catch (err) {
    res.status(400).send("somethings went wrong");
  }
})

//sending connection req apis..-------------------

app.post("/sendreqconn",userAuth, async(req, res) =>{
  try {
    const user = req.user
  //sending conn req
  console.log("sending a conn req")

  res.send("sent the connect req by: " + user.firstName)
    
  } catch (err) {
    res.status(400).send("sending req is fail!: " + err.message)
    
  }
  
})

app.patch("/user", async(req, res) =>{
      const userId = req.body.userId;
    const data = req.body;
  try {
  const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument:'after',
  runValidators: "true"
  });
  console.log(user)
  res.send("user update is successfully")
    
  } catch (err) {
    res.status(400).send("Update faild:" + err.message)
    
  }

})

connectDB().then(() =>{
  console.log("db conn established....")
  app.listen(4000, () =>{
  console.log("server is running at http://localhost:4000/")
});
})
.catch((err) =>{
  console.log("db is not be connected")
})

