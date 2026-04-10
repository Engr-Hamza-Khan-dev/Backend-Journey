import { asynchandler } from "../utils/asynchandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asynchandler(async (req, res) => {
  //get user details from frontend
  //validate user details - not empty,
  //check if user already exists
  //check for image upload,check for avatar
  //upload them to cloudinary
  //create user object -create entry in database
  //remove password and refresh token from user object before sending response
  //check for user creation success
  // send response to frontend

  const { username, email, password, fullname } = req.body;
  console.log(`username: ${username}\n
        email: ${email}\n
        password: ${password}\n
        fullname: ${fullname}`);

  //validate user details - not empty,
  if (
    [username, email, password, fullname].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!email.includes("@")) {
    throw new ApiError(400, "Invalid email format");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

    //check if user already exists
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  console.log("ExistedUser:", existedUser);

  if (existedUser) {
    throw new ApiError(
      409,
      "User already exists with the provided username or email",
    );
  }
 //check for image upload,check for avatar
  const avatarLocalPath = req.files?.avatar[0].path;
  const coverImagePath = req.files?.coverimage[0].path;
  console.log("Avatar Path:", avatarPath);
  console.log("Cover Image Path:", coverImagePath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
 

 //upload them to cloudinary
  const avataruploadResponse = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUploadResponse = await uploadOnCloudinary(coverImagePath);

  if (!avataruploadResponse) {
    throw new ApiError(500, "Failed to upload images");
  }

  //create user object -create entry in database

  const user = await User.create({
    fullname,
    avatar: avataruploadResponse.url,
    coverimage: coverImageUploadResponse?.url || "",
    username: username.toLowerCase(),
    email,
    password,
  })

  const createdUser=awaitUser.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  //send response to frontend
  return res.status(201).json(
    new ApiResponse(201,"User registered successfully",createdUser)
  )
});
export { registerUser };
