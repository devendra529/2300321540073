// env.ts
//this file is used to define the environment variables for the application
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/notification_system";
export const JWT_SECRET = process.env
.JWT_SECRET
|| "your_jwt_secret_key";           
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10);
    