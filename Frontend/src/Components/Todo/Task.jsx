import React, { useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { Calendar, Trash2, Check, Loader2 } from "lucide-react";

const Task = ({ todo, deleteTodo, updateTodo }) => {
  const { todoName, completed, date, _id } = todo;

  // Local loading states to prevent double-clicks
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateTodo = async () => {
    // Prevent interaction if any action is already in progress
    if (isUpdating || isDeleting) return;

    setIsUpdating(true);
    const { success, message } = await updateTodo(_id, !completed);
    setIsUpdating(false);

    if (!success) return toast.error(message);
  };

  const handleDeleteTodo = async () => {
    if (isUpdating || isDeleting) return;

    setIsDeleting(true);
    const { success, message } = await deleteTodo(_id);
    setIsDeleting(false);

    if (!success) return toast.error(message);
    toast.success(message);
  };

  return (
    <div
      className={`
      group flex items-center justify-between p-4 rounded-xl border transition-all duration-200
      ${
        completed
          ? "bg-zinc-50 border-zinc-100"
          : "bg-white border-zinc-200 hover:border-violet-300 hover:shadow-sm"
      }
    `}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Custom Checkbox */}
        <button
          onClick={handleUpdateTodo}
          disabled={isUpdating || isDeleting}
          className={`
            flex-shrink-0 cursor-pointer w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
            ${
              isUpdating
                ? "border-violet-300 bg-violet-50 cursor-wait"
                : completed
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "border-zinc-300 hover:border-violet-500 text-transparent"
            }
          `}
        >
          {isUpdating ? (
            <Loader2 size={14} className="animate-spin text-violet-600" />
          ) : (
            completed && <Check size={14} strokeWidth={3} />
          )}
        </button>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          <h4
            className={`
            text-lg font-medium truncate transition-all duration-200
            ${completed ? "text-zinc-400 line-through" : "text-zinc-800"}
          `}
          >
            {todoName}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <Calendar
              size={14}
              className={completed ? "text-zinc-300" : "text-violet-500"}
            />
            <p
              className={`text-sm ${
                completed ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              {moment(date).format("MMM DD, YYYY")}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="ml-4">
        <button
          onClick={handleDeleteTodo}
          disabled={isUpdating || isDeleting}
          className={`
            p-2 rounded-lg transition-all duration-200 focus:outline-none cursor-pointer
            ${
              isDeleting
                ? "text-red-400 bg-red-50 cursor-wait opacity-100"
                : "text-zinc-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
            }
          `}
          title="Delete Task"
        >
          {isDeleting ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Trash2 size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Task;
