import mongoose from "mongoose";
import env from "./validateEnv.js";

export default async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Database: Connected!");
  } catch (error) {
    console.log("Database: Not connected!");
    console.error(error);
  }
}
