import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB = async () => {
  try {
    const connectonInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`,
    );
    console.log(
      `MongoDB Connected !! DB HOST:${connectonInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MONGODB Connection ERROR :", error);
    process.exit(1);
  }
};

export default connectDB;
