import mongoose from "mongoose"
 
const {Schema} = mongoose

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String, 
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },  
    groupChats:{
        type: [String]
    }, 
    friends:{
        type: [String]
    },
    dms:{
        type: [String]
    },
    docs:{
        type: [String]
    },
    profileUrl:{
        type:String
    }
}, { timestamps:true } )
export default mongoose.model("User", UserSchema)