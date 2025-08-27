const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");  

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req, res) =>{
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId
    const status = req.params.status
    //dont trust req!!---------------------------------
    const allowedStatus = ["ignored", "interested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message: "invalid status type" + status});
    };
//checked the touserid is present in db or not 
   const toUser = await User.findById(toUserId);
   if(!toUser){
      return res.status(400).send({message: "user not found"})
   }

    //what if there exist a connectionreq if anyone send req then auto another person not allow to send req and user doest not send req itself not allowed 
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId: fromUserId},
      ],
    });
    if(existingConnectionRequest){
      return res.status(400).send({message: "connection request already exist "})
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    res.json({
      message: req.user.firstName+" is "+status+ " in " + toUser.firstName,
      data,
    })
    
  } catch (err) {
    res.status(400).send("sending req is fail!: " + err.message)
    
  }
  
})

requestRouter.post("/request/review/:status/:requestId",userAuth, async(req, res) =>{
  try {
    const loggedInUser = req.user;
    const requestId = req.params.requestId
    const status = req.params.status
    //dont trust req!!---------------------------------
    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message: "invalid status type" + status});
    };

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser,
      status: "interested"
    })
    if(!connectionRequest){
      return res.status(404).json({message: "connection request not found"})
    }
   connectionRequest.status =status;

   const data = await connectionRequest.save();
   res.json({message: "connection request  " + status,data});
    
  } catch (err) {
    res.status(400).send("ERROR: " + err.message)
    
  }
  
})




module.exports = requestRouter;