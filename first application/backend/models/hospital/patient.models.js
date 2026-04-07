import mongoose from "mongoose";

const patientchema=mongoose.Schema({
   name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital",
        required:true,
    },
    docter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Docter",
        required:true,
    },
    medicalHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medical",
        required:true,
    },
    bloodgroup:{
        type:String,
        enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"],
        required:true, 
    }
},{timestamps:true})
export const Patient=mongoose.model("Patient",patientchema)
