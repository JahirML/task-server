import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import router from "./routes/ProjectRoutes";
import { corosConfig } from "./config/cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors(corosConfig));
//! Routes
// app.use('/api/auth',router);
app.use(express.json());
app.use("/api/projects", router);
export default app;
