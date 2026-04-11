import jwt from "jsonwebtoken";
import {User} from "../models/User.models.js";
import { asynchandler } from "../utils/asynchandlers.js";
export const verifyjwt = asynchandler(async (req, res, next) => {
    try {
        const token =
            req.cookies.accessToken ||
            req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new Error(404, "User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new Error(401, error?.message || "Unauthorized");
    }
});
