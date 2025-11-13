require("dotenv").config();

// Helper module
const express = require("express");
const cors = require("cors");

// Local Module
const connectDB = require("./Config/db");
const authRoutes = require("./Routes/authRoutes");
const todoRoutes = require("./Routes/todoRoutes");

// Creating server
const app = express();

//Middle to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URI || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use of json
app.use(express.json());

// Connecting to DB
connectDB();

//Auth
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todo", todoRoutes);

// server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
