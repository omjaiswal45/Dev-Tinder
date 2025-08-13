const express = require("express")

const app = express();

const{adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/accessdata", (req, res) =>{
  //check the authorization using middleware
  res.send("all data sent")
})

app.post("/admin/adddata", (req, res) =>{
  //check the authorization here allso using middleware
  res.send("items is add to DB")
})
 app.delete("/admin/delete", (req, res) =>{
  // here also check authorization
  res.send("items deleted")
 })

 // here all the /user routerhandler 
app.post("/user/signup", (req,res)=>{
  res.send("user successful signup")
})

app.get("/user/login", userAuth, (req, res) =>{
  //here chekc auth
  res.send("user successfully login ")
})

 app.get("/user/profile", userAuth, (req,res) =>{
  // check user authontication 
  res.send ("here the userprofile")
 })

app.listen(4000, () =>{
  console.log("server is running at http://localhost:4000/")
});
