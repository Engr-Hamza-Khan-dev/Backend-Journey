
import {mongoose} from mongoose

const userschema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:8
        }
}
)

export const User=mongoose.model("User",userschema);