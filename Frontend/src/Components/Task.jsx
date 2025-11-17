import React, { useEffect, useState } from "react";
import moment from "moment";

const Task = ({ todo, deleteTodo, updateTodo }) => {
  const { todoName, completed, date, _id } = todo;
  const [checked, setCheked] = useState(completed);
  const taskCompleted = () => {
    setCheked(!checked);
  };
  useEffect(() => {
    updateTodo(_id, checked);
  }, [checked]);
  return (
    <div className="px-4 py-1 my-1  shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => taskCompleted()}
            />
          </div>
          <div>
            <h4
              className={`text-[20px] text-gray-800 max-w-[250px] sm:max-w-[500px] wrap-break-word  ${
                checked && "line-through"
              }`}
            >
              {todoName}
            </h4>
            <p className="text-[12px] mt-1 text-gray-700">
              {" "}
              Due: {moment(date).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>

        <div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer transition-colors duration-300"
            onClick={() => deleteTodo(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
