import mongoose from mongoose

const todoschema=new mongoose.Schema({
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
    },
    subtodos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubTodo"
        }
    ]//Array of subtodos
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoschema);