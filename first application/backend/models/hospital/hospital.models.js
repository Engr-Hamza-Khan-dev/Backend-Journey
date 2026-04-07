import mongoose from "mongoose";

const addresschema=mongoose.Schema({
    street:{
        type:String,
        required:true,
    },
    city:{ 
        type:String,
        required:true,
    },
   address1:{
        type:String,
        required:true,
    },
    address2:{
        type:String,
        required:true,
    },
    specialize:[{
        type:String,
        required:true,
    }],
    postalcode:{
        type:String,
        required:true,
    },
})
const hospitalschema=mongoose.Schema({
   name:{
        type:String,
        required:true,
    },
    location:{
        type:addresschema,
        required:true,
    }

},{timestamps:true})
export const Hospital=mongoose.model("Hospital",hospitalschema)
