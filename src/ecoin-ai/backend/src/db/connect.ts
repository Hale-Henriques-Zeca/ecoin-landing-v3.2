import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export let db: any;

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    db = conn.connection.db; // Atribui a instância do banco de dados aqui
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};