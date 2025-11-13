const express = require("express");
const { protect } = require("../Middleware/authMiddleware");
const {
  addTodo,
  updateTodo,
  getAllTodo,
  deleteTodo,
} = require("../Controller/todoController");

const router = express.Router();

router.post("/add", protect, addTodo);
router.put("/update/:id", protect, updateTodo);
router.get("/get", protect, getAllTodo);
router.delete("/delete/:id", protect, deleteTodo);

module.exports = router;
