import mongoose from "mongoose";
const catogoryschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Category=mongoose.model("Category",catogoryschema)