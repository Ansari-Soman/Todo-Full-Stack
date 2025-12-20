import React, { useState } from "react";
import toast from "react-hot-toast";

const Input = ({ addTodo }) => {
  const [todoName, setTodoName] = useState("");
  const [date, setDate] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAddTodo = async () => {
    const { success, message } = await addTodo(todoName, date);
    if (!success) toast.error(message);
    toast.success(message);
    setTodoName("");
    setDate("");
  };

  return (
    <div className="container mx-auto my-6 px-4 sm:px-10">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md p-6 sm:p-8 border border-blue-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-500 rounded-lg p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h4 className="text-2xl text-gray-800 font-bold">Add New Task</h4>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:flex md:items-end gap-4">
          {/* Task Name Input */}
          <div className="flex-1">
            <label
              htmlFor="todoName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Task Name
            </label>
            <div
              className={`
              relative transition-all duration-200
              ${isFocused ? "transform scale-[1.01]" : ""}
            `}
            >
              <input
                type="text"
                name="todoName"
                id="todoName"
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your task..."
                className={`
                  border-2 px-4 py-3 w-full rounded-lg 
                  bg-white outline-none
                  transition-all duration-200
                  placeholder-gray-400 text-gray-800
                  ${
                    isFocused
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-300 hover:border-gray-400"
                  }
                `}
              />
            </div>
          </div>

          {/* Date and Button Container */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            {/* Date Input */}
            <div>
              <label
                htmlFor="taskDate"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="taskDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500 
                           focus:ring-2 focus:ring-blue-100
                           rounded-lg px-4 py-3 bg-white outline-none
                           transition-all duration-200 text-gray-700
                           cursor-pointer"
                />
              </div>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAddTodo}
              disabled={!todoName.trim() || !date}
              className={`
                px-6 py-3 rounded-lg font-semibold
                transition-all duration-200
                flex items-center justify-center gap-2
                shadow-sm hover:shadow-md
                ${
                  !todoName.trim() || !date
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
