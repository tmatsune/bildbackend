import express from 'express'

import User from "../models/User.js";
import Groupchat from "../models/Groupchat.js";
import Message from '../models/Message.js';
  
const router = express.Router()

router.get('/getuserchats/:id', async (req, res, next) => {
    try{
       const currUser = await User.findById(req.params.id)
       if(!currUser){
        res.status(400).json("could not find users groupchats")
       }
       const gcList = await Promise.all(currUser.groupChats.map( item => {
            return Groupchat.find({chatName:item})
       }))
       console.log("all user group chats have been added")
       res.status(200).json(gcList)

    }catch(err){
        console.log(err)
        res.status(500).json("could not get group chats")
    }
})
router.put("/addFriend/:id", async(req, res, next) => {

    try{    
        const currUser = await User.findByIdAndUpdate(req.params.id, 
            {$addToSet:{ friends: req.body.friendToAdd } } )
        res.status(200).json(currUser)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})
router.post("/getUser", async(req, res) => {
   
    try{
        const foundUser = await User.findOne({username: req.body.findName})
        console.log(foundUser)
        res.status(200).json(foundUser)
    }catch(err){
        res.status(500).json(err)
    }
})
router.put('/addFriends/:id/:friendId', async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, 
            {$addToSet:{ friends:req.params.friendId}})
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json("test failed")
    }
})
router.get('/reqItem/:id/:type', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const type = req.params.type
        const reqData = user[type]
        res.status(200).json(reqData)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.put('/removeFriend/:id/:remUserName', async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, 
            {$pull:{friends:req.params.remUserName}})
        console.log("user removed")
        res.status(200).json(user)
    }catch(err){
        res.status(500).json("could not remove user")
    }
})
router.put('/updateUserImage/:id', async(req, res) => {
    try{
        const currUser = await User.findByIdAndUpdate(req.params.id, 
            {$set:{profileUrl: req.body.firebaseImage}})
        res.status(200).json(currUser)
    }catch(err){
        console.log(err)
        res.status(500).json("could not upload image")
    }
})

export default router
