import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfile) => {
  try {
    if (!fs.existsSync(localfile)) {
      throw new Error("File not found");
    }
    const response = await cloudinary.uploader.upload(localfile, {
      resource_type: "auto",
    });
    console.log("File has been uploaded",response.url);
    fs.unlinkSync(localfile); // Delete the local file after successful upload

    return response;
    
  } catch (error) {
    fs.unlinkSync(localfile); // Delete the local file after upload attempt
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary };