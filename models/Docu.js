import mongoose from "mongoose";

const DocuSchema = new mongoose.Schema({
    docName: {
        type: String,
        unique: true,
        required: true
    },
    data:{
        type: {}
    },
    fave:{
        type: Boolean
    },
    user:{
        type: String
    }
}, { timestamps:true })

export default mongoose.model("Docu", DocuSchema)