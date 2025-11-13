const Todo = require("../Model/Todo");

// Add todo
exports.addTodo = async (req, res) => {
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
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all todo
exports.getAllTodo = async (req, res) => {
  const userId = req.user.id;
  try {
    const allTodos = await Todo.find({ userId }).sort({ date: -1 });
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const { todoName, date, completed } = req.body;
  if (!todoName || !date || !completed) {
    res.status(200).json({ message: "All fields are required" });
  }
  try {
    const update = await Todo.findByIdAndUpdate(
      id,
      {
        todoName: todoName,
        date: date,
        completed: completed,
      },
      { new: true }
    );
    if (!update) {
      res.status(400).json({ message: "Todo not found" });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
