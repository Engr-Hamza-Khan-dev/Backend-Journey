import mongoose from "mongoose";

const medicalschema=mongoose.Schema({
   name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }

},{timestamps:true})
export const Medical=mongoose.model("Medical",medicalschema)
