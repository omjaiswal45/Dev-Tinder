const express = require("express")
const cookieParser = require('cookie-parser')
const app = express();
const connectDB = require("./config/database")
app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routers/auth")
const profileRouter = require("./routers/profile")
const requestRouter = require("./routers/request")
const acceptRpouter = require("./middlewares/auth")


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

connectDB().then(() =>{
  console.log("db conn established....")
  app.listen(4000, () =>{
  console.log("server is running at http://localhost:4000/")
});
})
.catch((err) =>{
  console.log("db is not be connected")
})

//login api 

//profile api


//feed api

// app.get("/feed",userAuth, async(req,res) =>{
//   try {
//     const alluser = await User.find({});
//     res.send(alluser)
    
//   } catch (err) {
//     res.status(400).send("somethings went wrong");
//   }
// })

//sending connection req apis..-------------------



// app.patch("/user", async(req, res) =>{
//       const userId = req.body.userId;
//     const data = req.body;
//   try {
//   const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument:'after',
//   runValidators: "true"
//   });
//   console.log(user)
//   res.send("user update is successfully")
    
//   } catch (err) {
//     res.status(400).send("Update faild:" + err.message)
    
//   }

// })
