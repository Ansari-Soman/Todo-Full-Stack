import React, { useState } from "react";

const Input = ({ addTodo }) => {
  const [todoName, setTodoName] = useState("");
  const [date, setDate] = useState("");
  const handleAddTodo = () => {
    addTodo(todoName, date);
    setTodoName("");
    setDate("");
  };
  return (
    <div className="container mx-auto my-4 px-2 sm:px-10">
      <div className="bg-white rounded-xl  p-6">
        <h4 className="text-2xl text-gray-800 font-bold">Add New Task</h4>
        <div className="grid grid-cols-1 md:flex justify-between items-center gap-4 my-3">
          <div className="w-full">
            <input
              type="text"
              name="todoName"
              id="todoName"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              placeholder="Enter task..."
              className="border px-3 py-2 w-full rounded-lg border-gray-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-500 rounded-lg px-3 py-2"
            />
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-white w-24 cursor-pointer"
              type="submit"
              onClick={handleAddTodo}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
