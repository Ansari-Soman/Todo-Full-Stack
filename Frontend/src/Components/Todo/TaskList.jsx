import Task from "./Task";
import { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext";
import { ClipboardList, Loader2 } from "lucide-react";

const TaskList = ({ todoList, deleteTodo, updateTodo }) => {
  const { loading } = useContext(TodoContext);

  return (
    <div className="container mx-auto px-4 sm:px-10 mb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sm:p-8 min-h-[400px]">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-2xl font-bold text-zinc-800 flex items-center gap-3">
            Your Tasks
            <span className="bg-zinc-100 text-zinc-600 rounded-full px-3 py-1 text-sm font-semibold border border-zinc-200">
              {todoList.length}
            </span>
          </h4>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-violet-500" />
            <p>Loading your tasks...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todoList.length > 0 ? (
              todoList.map((todo, idx) => (
                <Task
                  todo={todo}
                  key={todo._id || idx}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                  <ClipboardList className="w-12 h-12 text-zinc-300" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-700 mb-2">
                  No tasks yet
                </h3>
                <p className="text-zinc-500 max-w-sm">
                  You have no pending tasks. Use the input above to add your
                  first task and start being productive!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
