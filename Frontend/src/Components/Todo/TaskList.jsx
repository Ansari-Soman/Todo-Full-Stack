import Task from "./Task";
import { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext";

const TaskList = ({ todoList, deleteTodo, updateTodo }) => {
  const { loading } = useContext(TodoContext);

  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
          <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-lg px-3 py-1 text-lg font-semibold">
              {todoList.length}
            </span>
            Tasks
          </h4>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-500 font-medium">Loading tasks...</p>
          </div>
        ) : (
          <div>
            {todoList.length > 0 ? (
              <div className="space-y-2">
                {todoList.map((todo, idx) => (
                  <Task
                    todo={todo}
                    key={todo._id || idx}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium mb-1">
                  No tasks yet
                </p>
                <p className="text-gray-400 text-sm">
                  Add your first task to get started!
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
