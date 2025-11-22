import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    todoName: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
