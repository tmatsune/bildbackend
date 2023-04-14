import express from 'express'
import Groupchat from '../models/Groupchat.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

const router = express.Router()
 
router.post('/create', async(req, res, next) => {
    const createrUser = req.params.id
    const newGc = new Groupchat({
        users: req.body.username,     //include userID when making api call
        chatName: req.body.chatName,
        type: "gc",
        userIds: req.body.userId,
        desc: req.body.descript
    })
    try{
        const savedChat = await newGc.save() // saved user for mongodb
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, 
            { $addToSet: {groupChats: req.body.chatName} }) //savedChat._id
        console.log("new group chat created")
        res.status(200).json(savedChat)

    }catch(err){
        console.log(err)
        res.status(500).json("could not create new chat room")
    }
})
/*
router.post("/createDm", async(req, res) => {
    const newDm = new Groupchat({
        users: req.body.userName,
        chatName: `${req.body.userName}/${req.body.recUserName}`,
        type:"dm",
        userIds: req.body.userId
    })
    try{
        const savedDm = await newDm.save()
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, 
            { $push: {dms: savedDm.chatName} })
        res.status(200).json(newDm)
        console.log(savedDm.chatName)
    }catch(err){
        res.status(500).json(err)
    }
})
*/
router.put('/addUser', async(req, res) => {
    try{ // prams id is group chat id 
        console.log(req.body.username, req.body.userId)
        //const updatedChat = await Groupchat.findByIdAndUpdate(req.params.id, 
        //    {$push: {userIds: req.body.userId}}//$push: {users: req.body.username}
        //    )
        const updatedChat = await Groupchat.findOneAndUpdate({chatName: req.body.chatName},
            {$addToSet: {userIds: req.body.userId, users:req.body.username}}
            )
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, 
            { $addToSet: {groupChats: updatedChat.chatName} })
        console.log(req.body.chatName)
        res.status(200).json(updatedChat)
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
                {$pull: {groupChats: chatToDel.chatName}})
        })
        //return User.findByIdAndUpdate(item, {$pull: {groupChats: chatToDel.chatName}})
        res.status(200).json(chatToDel)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.delete('/delete/:id', async(req, res, next) => {
    const chatToDel = await Groupchat.findByIdAndDelete(req.params.id)
    try{    
        console.log(chatToDel)
        res.status(200).json("delted chat")
    }catch(err){
        console.log(err)
        res.status(500).json("could not delete")
    }
})

router.put("/remUser/:id", async(req, res) => {
    try{
        const updatedChat = await Groupchat.findByIdAndUpdate(req.params.id, 
            {$pull: {users:req.body.username}})
        const updatedUser = await User.findOneAndUpdate({username: req.body.username}, 
            {$pull: {groupChats: updatedChat.chatName}})
        res.status(200).json(updatedChat)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/getGroupchat/:id', async(req, res, next) => {
    const channel = await Groupchat.findById(req.params.id)  //Groupchat.findById(req.params.id)
    try{
        res.status(200).json(channel)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/getGroupchats/:id', async(req, res, next) => { //:id
    const channel = await Groupchat.findOne({chatName : req.params.id});  //Groupchat.findById(req.params.id)
    try{
        res.status(200).json(channel)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/getType/:id/:type', async (req, res) => {
    try{
        const currGroupChat = await Groupchat.findById(req.params.id)
        const type = req.params.type
        const reqData = currGroupChat[type]
        res.status(200).json(reqData)
    }catch(err){
        console.log(err)
        res.status(500).json("could not get item")
    }
})
router.put('/removeUserFromChat/:id', async(req, res) => {
    try{
        const currGc = await Groupchat.findByIdAndUpdate(req.params.id, 
            {$pull:{users: req.body.userName}})
        const remUser = await User.findOneAndUpdate({username: req.body.userName},
            {$pull:{groupChats: currGc.chatName}})
        res.status(200).json(currGc)
    }catch(err){
        console.log(err)
        res.status(500).json("could not remove user")
    }
})


export default router