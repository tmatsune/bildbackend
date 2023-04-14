import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

const adminUser = {
    "name":"terence matsune",
    "email": "matsuneterence@gmail.com",
    "username":"terencematsune",
    "password": "laker4life"
}

router.post('/register', async(req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hash,
    })
    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
        console.log("new user created")
    }catch(err){
        console.log(err)
        res.status(500).json("could not make new user")
    }
})
router.post('/login', async(req, res, next) => {
    try{
        const currUser = await User.findOne({email: req.body.email})
        if(!currUser){
            res.status(401).json("user does not exist")
        }else{ 
            const isPassword = await bcrypt.compare(req.body.password, currUser.password)
            if(!isPassword){
                res.status(404).json("password is incorrect")
            }
            const {password, ...otherDetails} = currUser._doc
            res.status(200).json({...otherDetails})
        }
    }catch(err){
        res.status(500).json("could not find user")
    }
})
//bcrypt.compareSync(myPlaintextPassword, hash);

router.post('/testingApi', async(req, res) => {
    const newUser = new User({
        name: "michael",
        email: "jordan@gmail.com",
        username: "jordanGoat",
        password: "jordan23",
    })
    try{
        //const savedUser = await newUser.save()
        res.status(200).json(newUser)
        console.log("new user created")
    }catch(err){
        console.log(err)
        res.status(500).json("error with testing api call")
    }
})
export default router;