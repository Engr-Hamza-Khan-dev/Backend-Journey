import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {User} from './models/User.models.js';
import userRoutes from './routes/user.routes.js';   
const app=express();

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true,
    }
));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/user",userRoutes);
//http://localhost:8000/api/user/register


export {app};