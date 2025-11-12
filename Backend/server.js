require("dotenv").config();

// Helper module
const express = require("express");
const cors = require("cors");

// Local Module
const connectDB = require("./Config/db");
// const authRoutes = require("./");

const app = express();

// Connecting to DB
connectDB();



// server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
