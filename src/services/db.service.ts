import mongoose from "mongoose";
import { LoggerService } from "./logger.service";
import {Pool} from 'pg';
import {config} from "../services/config.service";

const logger = new LoggerService();

export async function connectDB() {
    const pool = new Pool({
        user: config.DB_USER,
        host: config.DB_HOST,
        database: config.DB_NAME,
        password: config.DB_PASSWORD,
        port: Number(config.DB_PORT),
    })
    try {
        await pool.connect();
        logger.log("PostgreSQL connected successfully");
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        logger.error("PostgreSQL connection error:", message);
        process.exit(1);
    }
}
 