
import mongoose from 'mongoose'

const GroupChatSchema = new mongoose.Schema({
    users: {
        type:[], //should contain id
        required: false 
    },
    chatName:{
        type: String,
        required: true,
        unique: true
    },
    type:{
        type:String
    },
    userIds:{
        type:[]
    },
    desc:{
        type: String
    }
}, { timestamps:true })
export default mongoose.model("GroupChat", GroupChatSchema)


