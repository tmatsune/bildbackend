
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chatNameId:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    },
    text:{
        type: String
    },
    chatName: {
        type:String
    },
    imageUrl:{
        type:String
    }
}, { timestamps:true })

export default mongoose.model("Message", MessageSchema)
