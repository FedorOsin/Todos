import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateTodo, Todo, deleteTodo } from "../features/todo/todoSlice";
import { RootState } from "../app/Store";

export const Todos = () => {
  const [updateSectionId, setUpdateSectionId] = useState<string | null>(null);
  const [updatedText, setUpdatedText] = useState<string>("");

  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleUpdateTodo = (id: string) => {
    setUpdateSectionId(id);
    setUpdatedText("");
  };

  const handleUpdate = () => {
    if (!updateSectionId) return;
    dispatch(
      updateTodo({
        id: updateSectionId,
        newText: updatedText,
      })
    );
    setUpdateSectionId(null);
  };

  return (
    <section>
      <ul className="list-none bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className="m-4 flex justify-between items-center mx-10"
          >
            <span className="text-black font-serif font-bold p-4 w-48 border border-black">
              Заметка: <span className="text-green-500">{todo.text}</span>
            </span>

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
                  onClick={handleUpdate}
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Удалить
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded"
                  onClick={() => handleUpdateTodo(todo.id)}
                >
                  Изменить
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
