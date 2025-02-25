import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { Todo } from "../types";

function TodoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const todoId = id || "";

  const todoRedux = useSelector((state: RootState) =>
    state.todo.todos.find((todo) => todo.id === todoId)
  );

  const todosString = localStorage.getItem("todos");
  const todos = todosString ? JSON.parse(todosString) : [];
  const todoReact = todos.find((todo: Todo) => todo.id === todoId);

  const todo = todoRedux || todoReact;

  if (!todo) {
    return <div className="container mx-auto p-4">Задача не найдена</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Детали задачи</h1>
      <p>ID: {todo.id}</p>
      <p>Текст: {todo.text}</p>
      <p>Выполнено: {todo.completed ? "Да" : "Нет"}</p>
    </div>
  );
}

export default TodoDetailsPage;
