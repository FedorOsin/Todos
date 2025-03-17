import React, { useState } from "react";
import { Todo } from "@types";
import { Form } from "@components/Form";

function TodoReactPage() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "0",
      text: "testReactTodo",
      completed: false,
      description: "Описание",
      priority: "medium",
    },
  ]);

  const handleAddTodoReact = (todo: Omit<Todo, "id">) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...todo,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO (React)</h1>
      <Form onAddTodoReact={handleAddTodoReact} />
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
          {todos.map((todo: Todo) => (
            <tr key={todo.id} className="border-b border-gray-300">
              <td className="px-4 py-2">{todo.id}</td>
              <td className="px-4 py-2">{todo.text}</td>
              <td className="px-4 py-2">{todo.description}</td>
              <td className="px-4 py-2">{todo.priority}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
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

export default TodoReactPage;
