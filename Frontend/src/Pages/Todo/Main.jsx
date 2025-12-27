import SummaryBar from "../../Components/Todo/SummaryBar";
import Input from "../../Components/Todo/TodoInput";
import TaskList from "../../Components/Todo/TaskList";
import useTodoManager from "../../Hooks/useTodoManager";
import { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext";

const Main = () => {
  const { summary, todoList } = useContext(TodoContext);
  const { addTodo, deleteTodo, updateTodo } = useTodoManager();

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <SummaryBar summary={summary} />
      <Input addTodo={addTodo} />
      <TaskList
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        todoList={todoList}
      />
    </div>
  );
};

export default Main;
