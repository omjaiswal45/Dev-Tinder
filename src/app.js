const express = require("express")

const app = express();
const User = require("./models/user")
const connectDB = require("./config/database")
app.use(express.json());
app.post('/signup', async(req, res)=>{
  console.log(req.body)
  // creating instaances of the User model req.body return js obj
const user = new User(req.body);
try {
  await user.save();
  res.send("user is crreated successfully")
} catch (err) {
  res.status(400).send("error saving the user:" + err.message);
  
}
})

//feed api

app.get("/feed", async(req,res) =>{
  try {
    const alluser = await User.find({});
    res.send(alluser)
    
  } catch (err) {
    res.status(400).send("somethings went wrong");
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

