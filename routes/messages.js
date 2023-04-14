
import express from 'express'
import Message from '../models/Message.js'
import Groupchat from '../models/Groupchat.js'
import { RawShaderMaterial } from 'three'

const router = express.Router()

router.post('/addMessage', async(req, res, next) => {
    const newMsg = new Message({
        chatNameId: req.body.chatNameId,
        sender: req.body.sender,
        text: req.body.text,
        imageUrl: req.body.firebaseImgUrl
    })
    try{
        const savedMsg = await newMsg.save()
        res.status(200).json(savedMsg)
        console.log("message sent")
    }catch(err){    
        console.log(err)
        res.status(500).json("could not create new message")
    }
})

router.get('/getmessages/:convoId', async (req, res, next) => {
    try{
        const messages = await Message.find({
            chatNameId: req.params.convoId // will find messages with params id
        })
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json('could not get all messages')
    }
})
// test test
router.get('/getmessagess/:convoId', async (req, res, next) => {
    try{
        const messages = await Message.find({
            chatNameId: req.params.convoId // will find messages with params id
        })
        res.status(200).json(messages)
    }catch(err){
        console.log(err)
        res.status(500).json('could not get all messages')
    }
})

router.delete('/delete/:id', async(req, res, next) => {
    try{
        const deletedMsg = await Message.findByIdAndDelete(req.params.id)
        res.status(200).json("message has been deleted")
    }catch(err){
        res.status(500).json('could not delete message')
    }
})
router.delete('/deleteGcMessages/:id', async(req, res) => {
    try{
        const msgs = await Message.find({chatNameId: req.params.id })
        console.log("messages found")
        console.log(msgs)
        msgs.forEach(async item => {
            await Message.findByIdAndDelete(item._id)
        })
        console.log(msgs)
        console.log("msgs delted")
        res.status(200).json("messges deleted")
    }catch(err){
        console.log(err)
        res.status(500).json("could not deltet message")
    }
})

export default router