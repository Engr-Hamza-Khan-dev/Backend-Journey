import mongoose from "mongoose";

const subtodoschema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"  
    }

},{timestamps:true})

export const SubTodo=mongoose.model("SubTodo",subtodoschema);