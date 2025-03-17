import React, { memo, useState, useCallback } from "react";
import { Todo } from "@types";
import { Link } from "react-router-dom";
import {
  RadioGroup,
  RadioGroupOption,
  RadioGroupProps,
} from "@headlessui/react"; // Исправлено import
import { useUpdateTodoMutation } from "@features/todo/todoApi";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string) => void; // Добавьте этот пропс
  setUpdateSectionId: React.Dispatch<React.SetStateAction<string | null>>;
  updateSectionId: string | null;
  updatedText: string;
  setUpdatedText: (text: string) => void;
  onHandleUpdate: () => void;
  useRedux: boolean;
}

const TodoItem: React.FC<TodoItemProps> = memo(
  ({
    todo,
    onToggleComplete,
    onDeleteTodo,
    onUpdateTodo, // Добавьте этот пропс
    setUpdateSectionId,
    updateSectionId,
    updatedText,
    setUpdatedText,
    onHandleUpdate,
    useRedux,
  }) => {
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [description, setDescription] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority);
    const [updateTodo] = useUpdateTodoMutation();

    const handleDescriptionChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setDescription(e.target.value);
    };

    const handlePriorityChange = (value: "low" | "medium" | "high") => {
      setPriority(value);
    };

    const handleSaveDescription = useCallback(async () => {
      try {
        await updateTodo({
          id: todo.id,
          text: todo.text,
          description: description,
          priority: priority,
        } as any).unwrap(); // приведение типов
        setIsEditingDescription(false);
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    }, [updateTodo, todo.id, todo.text, description, priority]);

    return (
      <li className="m-4 flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 rounded-md p-4">
        {/* Основное содержимое TodoItem */}
        <div className="flex items-center mb-2 md:mb-0">
          <input
            type="checkbox"
            id={`todo-${todo.id}`}
            className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className={`text-gray-700 ${
              todo.completed ? "line-through" : ""
            } font-bold`}
          >
            {todo.text}
          </label>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full">
          {/*  Приоритет */}
          <div className="w-full md:w-auto">
            <RadioGroup value={priority} onChange={handlePriorityChange}>
              <RadioGroup.Label className="sr-only">Приоритет</RadioGroup.Label>
              <div className="flex space-x-2">
                <RadioGroup.Option
                  as="div" // Используем as="div" вместо RadioGroupOption
                  value="low"
                  className={
                    ({ active, checked }) =>
                      `${active ? "ring-2 ring-offset-2 ring-blue-500" : ""}
                     ${
                       checked
                         ? "bg-blue-500 text-white"
                         : "bg-white text-gray-900"
                     }
                      relative inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm font-medium hover:bg-gray-200 transition duration-150 ease-in-out` // Добавлено hover:bg-gray-200
                  }
                >
                  <span className="sr-only">Low</span>
                  Низкий
                </RadioGroup.Option>
                <RadioGroup.Option
                  as="div" // Используем as="div" вместо RadioGroupOption
                  value="medium"
                  className={
                    ({ active, checked }) =>
                      `${active ? "ring-2 ring-offset-2 ring-blue-500" : ""}
                     ${
                       checked
                         ? "bg-blue-500 text-white"
                         : "bg-white text-gray-900"
                     }
                      relative inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm font-medium hover:bg-yellow-200 transition duration-150 ease-in-out` // Добавлено hover:bg-yellow-200
                  }
                >
                  <span className="sr-only">Medium</span>
                  Средний
                </RadioGroup.Option>
                <RadioGroup.Option
                  as="div" // Используем as="div" вместо RadioGroupOption
                  value="high"
                  className={
                    ({ active, checked }) =>
                      `${active ? "ring-2 ring-offset-2 ring-blue-500" : ""}
                     ${
                       checked
                         ? "bg-blue-500 text-white"
                         : "bg-white text-gray-900"
                     }
                      relative inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm font-medium hover:bg-red-200 transition duration-150 ease-in-out` // Добавлено hover:bg-red-200
                  }
                >
                  <span className="sr-only">High</span>
                  Высокий
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </div>
          {/*  Описание */}
          <div className="w-full">
            {isEditingDescription ? (
              <>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  onClick={handleSaveDescription}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                >
                  Сохранить
                </button>
              </>
            ) : (
              <p className="text-gray-700">{description}</p>
            )}
            <button
              onClick={() => setIsEditingDescription(!isEditingDescription)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              {isEditingDescription ? "Отмена" : "Изменить описание"}
            </button>
          </div>
        </div>
        {/*  Кнопки Удалить, Изменить, Подробнее */}
        <div>
          {todo.id === updateSectionId ? (
            <button
              onClick={onHandleUpdate}
              className="bg-green-500 hover:bg-green-700 text-white p-2 rounded"
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-700 text-white p-2 rounded mr-2 flex space-x-3"
              >
                Удалить
              </button>
              <button
                onClick={() => onUpdateTodo(todo.id)} // Используйте onUpdateTodo
                className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded flex space-x-3"
              >
                Изменить
              </button>
            </>
          )}
        </div>
        <Link
          to={`/todo/${todo.id}`}
          className="text-blue-500 hover:text-blue-700 mr-2"
        >
          Подробнее
        </Link>
      </li>
    );
  }
);

export default TodoItem;
