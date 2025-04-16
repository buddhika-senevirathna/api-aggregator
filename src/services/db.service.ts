import mongoose from "mongoose";
import { LoggerService } from "./logger.service";

const logger = new LoggerService();

export async function connectDB() {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/graphql-example";
    try {
        await mongoose.connect(uri);
        logger.log("MongoDB connected successfully");
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        logger.error("MongoDB connection error:", message);
        process.exit(1);
    }
}
