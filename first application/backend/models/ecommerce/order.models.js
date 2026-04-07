import mongoose from "mongoose";

const orderitemschema=mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    }
})

const addressschema=mongoose.Schema({
    street:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    postalcode:{    
        type:String,
        required:true,
    },
})

const orderschema=mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderprice:{
        type:Number,
        required:true,
    },
    orderitems:{
        type:[orderitemschema],
        required:true,
    },
    address:{
        type:addressschema,
        required:true,
    },
    status:{
        type:String,
        enum:["PENDING","SHIPPED","DELIVERED"],
        default:"PENDING",
    }
},{timestamps:true})

export const Order=mongoose.model("Order",orderschema)