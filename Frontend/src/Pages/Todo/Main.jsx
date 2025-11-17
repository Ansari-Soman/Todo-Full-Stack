import React, { useEffect, useState } from "react";
import SummaryBar from "../../Components/common/SummaryBar";
import Input from "../../Components/Todo/TodoInput";
import TaskList from "../../Components/Todo/TaskList";
import useUserAuth from "../../Hooks/userAuth";
import useTodoManager from "../../Hooks/useTodoManager";

const Main = () => {
  useUserAuth();
  const {
    summary,
    addTodo,
    deleteTodo,
    updateTodo,
    todoList,
  } = useTodoManager();

  return (
    <>
      <SummaryBar summary={summary} />
      <Input addTodo={addTodo} />
      <TaskList
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        todoList={todoList}
      />
    </>
  );
};

export default Main;
