import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import {
  addTodo,
  updateTodo,
  getAllTodo,
  deleteTodo,
} from "../Controller/todoController.js";
import { validate } from "../Middleware/validate.js";
import {
  addTodoSchema,
  todoIdParamSchema,
  updateTodoSchema,
} from "../zodSchema/todoShema.js";

const router = express.Router();

router.post("/add", protect, validate(addTodoSchema), addTodo);
router.put("/update/:id", protect, validate(updateTodoSchema), updateTodo);
router.get("/get", protect, getAllTodo);
router.delete("/delete/:id", protect, validate(todoIdParamSchema), deleteTodo);

export default router;
