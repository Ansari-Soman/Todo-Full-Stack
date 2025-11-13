const mongoose = require("mongoose");

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

module.exports = mongoose.model("Todo", TodoSchema);
