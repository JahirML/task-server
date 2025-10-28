import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import ProjectRoutes from "./routes/ProjectRoutes";
import { corosConfig } from "./config/cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
// login
app.use(morgan("dev"));
app.use(cors(corosConfig));
app.use(express.json());
//! Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", ProjectRoutes);
export default app;
