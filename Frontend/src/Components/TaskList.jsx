import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATH } from "../Utils/apiPath";
import Task from "./Task";
import toast from "react-hot-toast";

const TaskList = ({ todoList, deleteTodo, updateTodo }) => {
  return (
    <div className="container mx-auto px-2 sm:px-10 ">
      <div className="bg-white p-6 rounded-lg">
        <h4 className="text-2xl font-bold my-2">Tasks</h4>
        <div>
          {todoList.length > 0 ? (
            todoList.map((todo, idx) => (
              <Task
                todo={todo}
                key={idx}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))
          ) : (
            <p>Your list is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
