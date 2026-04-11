import jwt from "jsonwebtoken";
import {User} from "../models/User.models.js";
import { asynchandler } from "../utils/asynchandlers.js";
import { ApiError } from "../utils/ApiError.js";
export const verifyjwt = asynchandler(async (req, res, next) => {
    try {
        const token =
            req.cookies.accessToken ||
            req.headers.authorization?.replace("Bearer ", "");
            console.log("Autorization :",req.headers.authorization);
            
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized");
    }
});
