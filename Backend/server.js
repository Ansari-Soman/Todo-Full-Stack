require("dotenv").config();

// Helper module
const express = require("express");
const cors = require("cors");


const app = express();


// server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
