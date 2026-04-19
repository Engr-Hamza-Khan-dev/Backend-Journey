import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";

const DeleteOldPicture = async (PicturePublicId) => {
  try {
    if (!PicturePublicId) return null;

    const deleteOldPic = await cloudinary.uploader.destroy(PicturePublicId);
    console.log("Deleted : ", deleteOldPic);
    return deleteOldPic;
  } catch (error) {
    throw new ApiError(500, "Failed to delete old picture", error);
  }
};

export { DeleteOldPicture };
