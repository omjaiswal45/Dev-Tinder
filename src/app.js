const express = require ("express");
 
const app = express();

 

app.use('/user/id', (req,res)=>{
  res.send("a specicifc user id name ")
 })

 app.use('/user', (req, res) =>{
  res.send("here is the list of user" )
 });


app.use('/',(req, res) =>{
res.send (("my name is om jaiswal"))

});




app.listen(4000, () =>{
  console.log("server is running at http://localhost:4000/")
})