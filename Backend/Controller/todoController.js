import Todo from "../Model/Todo.js";
import asyncHandler from "../Utils/asyncHandler.js";

// Add todo
export const addTodo = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { todoName, date } = req.body;

  const newTodo = new Todo({
    userId,
    todoName,
    date,
  });
  await newTodo.save();
  return res.status(201).json({
    success: true,
    message: "Todo created successfully",
    todo: newTodo,
  });
});

// Get all todo
export const getAllTodo = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const allTodos = await Todo.find({ userId }).sort({ date: -1 });
  res
    .status(200)
    .json({ success: true, count: allTodos.length, todos: allTodos });
});

// Update todo
export const updateTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  const todo = await Todo.findOne({ _id: id, userId });

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  todo.completed = req.body.completed;
  await todo.save();
  return res
    .status(200)
    .json({ success: true, message: "Todo updated successfully", todo });
});

// Delete todo
export const deleteTodo = asyncHandler(async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  if (!deletedTodo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  res.status(200).json({ success: true, message: "Todo deleted successfully" });
});
