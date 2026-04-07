import mongoose, { mongo } from "mongoose";   
const productschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Product=mongoose.model("Product",productschema)