import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import {
  addTodo,
  updateTodo,
  getAllTodo,
  deleteTodo,
} from "../Controller/todoController.js";

const router = express.Router();

router.post("/add", protect, addTodo);
router.put("/update/:id", protect, updateTodo);
router.get("/get", protect, getAllTodo);
router.delete("/delete/:id", protect, deleteTodo);

export default router;
