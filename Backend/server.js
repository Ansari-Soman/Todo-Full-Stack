import "dotenv/config";

// Helper module
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Local Module
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import todoRoutes from "./Routes/todoRoutes.js";
import errorHandler from "./Middleware/errorHandler.js";

// Creating server
const app = express();

//Middle to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use of json
app.use(express.json());
app.use(cookieParser());

// Connecting to DB
connectDB();

//Auth
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todo", todoRoutes);

app.use(errorHandler);
// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
