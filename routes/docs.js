import express from 'express'
import Docu from '../models/Docu.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/createDoc', async(req, res, next) => {
    const newDoc = new Docu({
        docName: `${req.body.docsName},${req.body.currUserName}`,
        data: req.body.textData,
        fave: req.body.isFave,
        user: req.body.currUserName
    })
    try{
        const savedDocu = newDoc.save()
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, 
            {$push: {docs: `${req.body.docsName},${req.body.currUserName}`}})

        res.status(200).json(newDoc) //savedDocu
    }catch(err){
        console.log(err)
        res.status(500).json("could not create doc")
    }
})
router.post('/getUserDocs', async(req, res) => {
    try{
        const allDocs = await Docu.find({user: req.body.currUserName})
        res.status(200).json(allDocs)
    }catch(err){
        //console.log(err)
        res.status(500).json("could not get docs")
    }
})
router.get('/getDocument/:docName', async(req, res) => {
    try{
        const docInfo = await Docu.findOne({docName:req.params.docName})
        //console.log(docInfo)
        res.status(200).json(docInfo)
    }catch(err){
        console.log(err)
        res.status(500).json("could not get user doc")
    }
})
router.put('/saveDocs/:docName', async(req, res) => {

    try{
        const currDoc = await Docu.findOneAndUpdate({docName:req.params.docName},
            {$set: { data: { info: req.body.newInfo} }})
        console.log("data saved")
        res.status(200).json(currDoc)
    }catch(err){
        console.log(err)
        res.status(500).json("error could not save docs")
    }
})
router.put('/pinDoc/:docName', async(req, res) => {
    try{
        const currDoc = await Docu.findOneAndUpdate({docName: req.params.docName}, 
            {$set:{fave: req.body.pinned}})
        
    }catch(err){
        console.log(err)
        res.status(500).json("item pinned")
    }
})
router.put('/removeDocFromUser', async(req, res) => {
    try{
        const currUser = await User.findOneAndUpdate({username: req.body.userName}, 
            {$pull:{ docs:req.body.docName }})
        res.status(200).json("doc deleted")
    }catch(err){
        console.log(err)
        res.status(500).json("could not remove doc form user")
    }
})
router.delete('/removeDoc/:docName', async(req, res) => {
    try{
        const docToDel = await Docu.findByIdAndDelete(req.params.docName)
        res.status(200).json(docToDel)
    }catch(err){
        console.log(err)
        res.status(500).json("could not delete doc")
    }
})

export default router;