import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTodo as updateTodoRedux,
  deleteTodo as deleteTodoRedux,
  toggleComplete as toggleCompleteRedux,
} from "@features/todo/todoSlice";
import { RootState } from "@store/Store";
import { Todo } from "@types";
import TodoItem from "@components/TodoItem";

interface TodosProps {
  useRedux: boolean;
  todos?: Todo[];
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const Todos: React.FC<TodosProps> = ({ useRedux }) => {
  const [updateSectionId, setUpdateSectionId] = useState<string | null>(null);
  const [updatedText, setUpdatedText] = useState<string>("");

  const todosRedux = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleUpdateTodo = useCallback((id: string) => {
    setUpdateSectionId(id);
    setUpdatedText("");
  }, []);

  const handleUpdate = useCallback(() => {
    if (!updateSectionId) return;
    dispatch(
      updateTodoRedux({
        id: updateSectionId,
        newText: updatedText,
      })
    );
    setUpdateSectionId(null);
  }, [dispatch, updateSectionId, updatedText]);

  const handleDeleteTodo = useCallback(
    (id: string) => {
      dispatch(deleteTodoRedux(id));
    },
    [dispatch]
  );

  const handleToggleComplete = useCallback(
    (id: string) => {
      dispatch(toggleCompleteRedux(id));
    },
    [dispatch]
  );

  return (
    <section>
      <ul className="list-none bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {todosRedux.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onDeleteTodo={handleDeleteTodo}
            setUpdateSectionId={setUpdateSectionId}
            onUpdateTodo={handleUpdateTodo}
            onHandleUpdate={handleUpdate}
            updateSectionId={updateSectionId}
            updatedText={updatedText}
            setUpdatedText={setUpdatedText}
            useRedux={useRedux}
          />
        ))}
      </ul>
    </section>
  );
};
