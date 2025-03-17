import React, { useState } from "react";
import { useAddTodoMutation } from "@features/todo/todoApi";
import { Todo } from "@types";

interface FormProps {
  onAddTodoReact?: (todo: Omit<Todo, "id">) => void;
}

export const Form: React.FC<FormProps> = ({ onAddTodoReact }) => {
  const [text, setText] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [addTodo] = useAddTodoMutation();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const newTodo = {
      text,
      description,
      priority,
      completed: false,
    };

    if (onAddTodoReact) {
      onAddTodoReact(newTodo);
    } else {
      try {
        await addTodo({ text, description, priority }).unwrap();
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }
    setText("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleAddTodo}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="text"
          >
            Добавь новую заметку
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="text"
            value={text}
            placeholder="Написать..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font00 text-sm font-bold mb-2"
            htmlFor="priority"
          >
            Приоритет
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};
