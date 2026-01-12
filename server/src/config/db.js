import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log(`Db Connected Successfully`);
    } catch (error) {
        console.error(`Db Cnnection failed :  -- ${error}`);
    }
}

export { connectDb }