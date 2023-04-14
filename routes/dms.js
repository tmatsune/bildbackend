import express from "express";
import Groupchat from "../models/Groupchat.js";
import User from "../models/User.js";

const router = express.Router()
 
router.post("/createDm", async(req, res) => {
    const newDm = new Groupchat({
        users: [req.body.userName, req.body.recUserName],
        chatName: `${req.body.userName},${req.body.recUserName}`,
        type:"dm",
    })

    try{
        const savedDm = await newDm.save()
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, 
            { $push: {dms: savedDm.chatName} })
        const otherUser = await User.findOneAndUpdate({username: req.body.recUserName},
            { $push: {dms: savedDm.chatName} })

        res.status(200).json(newDm)
        console.log(savedDm.chatName)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.put("/deleteLis/:id", async(req, res, next) => {
    const chatToDel = await Groupchat.findById(req.params.id)
    try{
        //Groupchat.findOneAndUpdate({chatName: req.body.chatName}
        chatToDel.users.forEach(async item => {
            const user = await User.findOneAndUpdate({username : item}, 
                {$pull: {dms: chatToDel.chatName}})
        })
        //return User.findByIdAndUpdate(item, {$pull: {groupChats: chatToDel.chatName}})
        res.status(200).json(chatToDel)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.delete("/deleteDm/:id", async(req, res) => {
    const chatToDel = await Groupchat.findByIdAndDelete(req.params.id)
    try{    
        console.log(chatToDel)
        res.status(200).json("delted chat")
    }catch(err){
        console.log(err)
        res.status(500).json("could not delete")
    }
})

export default router
