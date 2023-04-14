import express from "express"; // "type":"module"
import dotenv from 'dotenv'
import cors from "cors"
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import gcRoute from './routes/groupchats.js'
import msgRoute from './routes/messages.js'
import userRoute from './routes/users.js'
import docsRoute from './routes/docs.js'
import dmsRoute from './routes/dms.js'

const app = express()
dotenv.config()
app.use(cors())

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb")
    }catch(err){
        console.log(err)
        throw err
    }
}
app.use(express.json())

// routes
app.use('/auth', authRoute)
app.use('/groupchat', gcRoute)
app.use('/message', msgRoute)
app.use('/users', userRoute)
app.use('/docs', docsRoute)
app.use('/dms', dmsRoute)

app.get('/', (req, res) => {
    res.send("working")
})
//3001
app.listen(3001 , () => {
    connect()
    console.log("connected to backend")
})

