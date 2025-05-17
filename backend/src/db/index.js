import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export default async function connectDB() {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("Database connected : " + response.connection.host);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
