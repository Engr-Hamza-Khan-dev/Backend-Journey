import { asynchandler } from "../utils/asynchandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessandRefreshTokens = async (userid) => {
  const user = await User.findById(userid);
  const accessToken = await user.AccessToken();
  const refreshToken = await user.RefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

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
  const existedUser = await User.findOne({
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
  let coverImagePath;
  let coverImageUploadResponse;
  if (
    req.files &&
    Array.isArray(req.files.coverimage) &&
    req.files.coverimage.length > 0
  ) {
    coverImagePath = req.files.coverimage[0].path;
    console.log("Cover Image Path:", coverImagePath);
    coverImageUploadResponse = await uploadOnCloudinary(coverImagePath);
  }
  console.log("Request Files:", req.files);
  console.log("Avatar Path:", avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  //upload them to cloudinary
  const avataruploadResponse = await uploadOnCloudinary(avatarLocalPath);

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
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  //send response to frontend
  return res
    .status(201)
    .json(new ApiResponse(200,  createdUser,"User registered successfully"));
});

// Login user controller
const LoginUser = asynchandler(async (req, res) => {
  //get user details from frontend
  //validate user details - not empty,
  //check if user exists
  //compare password
  //generate access token and refresh token
  //store refresh token in database
  //send response to frontend with access token and user details
  const { email, username, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exit");
  }

  const isPasswordCorrect = await user.isPasswordMatch(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    user._id,
  );
  const LoggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: LoggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );
});

const LogoutUser = asynchandler(async (req, res) => {
  //get user details from request
  //clear refresh token from database
  //clear cookies from frontend
  //send response to frontend
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: false,
  };
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
export { registerUser, LoginUser, LogoutUser };
