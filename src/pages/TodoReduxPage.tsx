import React from "react";
import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useToggleCompleteMutation,
} from "@features/todo/todoApi";
import { Todo } from "@types";
import { Form } from "@components/Form";

function TodoReduxPage() {
  const { todos, isLoading, isError, error } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleComplete] = useToggleCompleteMutation();

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    toggleComplete({ id, completed: !completed });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error details:", error); // Добавили вывод в консоль
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? error.message
        : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO (Redux)</h1>
      <Form />
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Текст</th>
            <th className="px-4 py-2">Описание</th>
            <th className="px-4 py-2">Приоритет</th>
            <th className="px-4 py-2">Завершено</th>
            <th className="px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {todos &&
            todos.map((todo: Todo) => (
              <tr key={todo.id} className="border-b border-gray-300">
                <td className="px-4 py-2">{todo.id}</td>
                <td className="px-4 py-2">{todo.text}</td>
                <td className="px-4 py-2">{todo.description}</td>
                <td className="px-4 py-2">{todo.priority}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      handleToggleComplete(todo.id, todo.completed)
                    }
                    className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoReduxPage;
