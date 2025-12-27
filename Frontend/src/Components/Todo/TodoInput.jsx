import React, { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Calendar, Type } from "lucide-react";
import Button from "../common/Button";

const Input = ({ addTodo }) => {
  const [todoName, setTodoName] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTodo = async () => {
    if (isLoading || !todoName.trim() || !date) return;

    setIsLoading(true);

    const { success, message } = await addTodo(todoName, date);

    setIsLoading(false);

    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
      setTodoName("");
      setDate("");
    }
  };

  return (
    <div className="container mx-auto my-8 px-4 sm:px-10">
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-violet-100 p-2 rounded-lg">
            <Plus className="w-6 h-6 text-violet-600" />
          </div>
          <h4 className="text-xl text-zinc-800 font-bold">Add New Task</h4>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Task Name */}
          <div className="w-full md:flex-1">
            <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
              What needs to be done?
            </label>
            <div className="relative">
              <Type className="absolute left-4 top-3.5 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                placeholder="Enter task name..."
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl outline-none text-zinc-800 placeholder-zinc-400 focus:border-violet-500 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="w-full md:w-64">
            <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
              Due Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 text-zinc-400 w-5 h-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl outline-none text-zinc-800 focus:border-violet-500 focus:bg-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Add Button */}
          <div className="w-full md:w-auto">
            <Button
              onClick={handleAddTodo}
              isLoading={isLoading}
              disabled={isLoading || !todoName.trim() || !date}
              className="w-full md:w-auto h-[52px]"
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
