import Todo from "../Model/Todo.js";

// Add todo
export const addTodo = async (req, res) => {
  const userId = req.user.id;
  const { todoName, date } = req.body;
  if (!todoName || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newTodo = new Todo({
      userId,
      todoName,
      date,
    });
    await newTodo.save();
    return res.status(200).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all todo
export const getAllTodo = async (req, res) => {
  const userId = req.user.id;
  try {
    const allTodos = await Todo.find({ userId }).sort({ date: -1 });
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;
  // NOTE: This check has a minor logic issue: it returns 200 (Success) with an error message.
  // A 400 (Bad Request) status is typically more appropriate for missing fields.
  if (completed === undefined) {
    return res.status(400).json({ message: "Completed field is required" });
  }
  try {
    const update = await Todo.findByIdAndUpdate(
      id,
      { completed: completed },
      { new: true }
    );
    if (!update) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
