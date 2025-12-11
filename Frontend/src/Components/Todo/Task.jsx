import React, { useEffect, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";

const Task = ({ todo, deleteTodo, updateTodo }) => {
  const { todoName, completed, date, _id } = todo;

  const handleUpdateTodo = async () => {
    todo.completed = !todo.completed;
    const response = await updateTodo(_id, todo.completed);
    if (!response.success) return toast.error(response.message);
  };

  const handleDeleteTodo = async () => {
    const response = await deleteTodo(_id);
    if (!response.success) return toast.error(response.error);
    toast.success(response.message);
  };

  return (
    <div
      className={`
      bg-white rounded-xl shadow-sm hover:shadow-md 
      transition-all duration-200 mb-3 border-l-4
      ${todo.completed ? "border-green-500 bg-gray-50" : "border-blue-500"}
    `}
    >
      <div className="flex justify-between items-center px-5 py-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Custom Checkbox */}
          <div className="flex-shrink-0">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleUpdateTodo}
                className="sr-only peer"
              />
              <div
                className={`
                w-6 h-6 border-2 rounded-md flex items-center justify-center
                transition-all duration-200
                ${
                  todo.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 hover:border-blue-500"
                }
              `}
              >
                {todo.completed && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </label>
          </div>

          {/* Task Details */}
          <div className="flex-1 min-w-0">
            <h4
              className={`
              text-lg font-medium break-words
              transition-all duration-200
              ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}
            `}
            >
              {todoName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-500">
                Due: {moment(date).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <div className="flex-shrink-0 ml-4">
          <button
            onClick={() => handleDeleteTodo()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium
                     hover:bg-red-600 active:bg-red-700
                     transition-colors duration-200 
                     shadow-sm hover:shadow-md
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
