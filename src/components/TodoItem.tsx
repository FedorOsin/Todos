import React, { memo } from "react";
import { Todo } from "@types";
import { Link } from "react-router-dom";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  setUpdateSectionId: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdateTodo: (newText: string) => void;
  //   onHandleUpdateTodo: (id: string) => void;
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
    setUpdateSectionId,
    updateSectionId,
    updatedText,
    setUpdatedText,
    onHandleUpdate,
    useRedux,
  }) => {
    return (
      <li className="m-4 flex justify-between items-center mx-10">
        <span className="text-black font-serif font-bold p-4 w-48 border border-black">
          Заметка:{" "}
          <span
            key={todo.id}
            className={`text-green-500 ${todo.completed ? "line-through" : ""}`}
          >
            {todo.text}
          </span>
        </span>
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded"
        >
          {todo.completed ? "Отменить" : "Завершить"}
        </button>
        {updateSectionId === todo.id ? (
          <>
            <input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              placeholder="Изменить заметку..."
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded"
              onClick={onHandleUpdate}
            >
              Сохранить
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded"
              onClick={() => onDeleteTodo(todo.id)}
            >
              Удалить
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded"
              onClick={() => setUpdateSectionId(todo.id)}
              //   onClick={() => onHandleUpdateTodo(todo.id)}
            >
              Изменить
            </button>
            <Link
              to={`/todo/${todo.id}`}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              Подробнее
            </Link>
          </>
        )}
      </li>
    );
  }
);

export default TodoItem;
