import { Router } from "express";
import { LoginUser, registerUser,LogoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/Auth.middleware.js";

const userRoutes = Router();

userRoutes.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverimage",
      maxCount: 1,
    },
  ]),
  registerUser,
);

userRoutes.route("/login").post( LoginUser);

// Secured route
userRoutes.route("/logout").post(verifyjwt, LogoutUser);
export default userRoutes;
