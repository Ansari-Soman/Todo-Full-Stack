const express = require("express");
const {
  getUserInfo,
  registerUser,
  loginUser,
} = require("../Controller/authController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

module.exports = router;
