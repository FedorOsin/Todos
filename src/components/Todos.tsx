import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  updateTodo as updateTodoRedux,
  deleteTodo as deleteTodoRedux,
  toggleComplete as toggleCompleteRedux,
} from "@features/todo/todoSlice";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleCompleteMutation,
} from "@features/todo/todoApi";
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

  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetTodosQuery();

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleComplete] = useToggleCompleteMutation();

  const handleUpdateTodo = useCallback((id: string) => {
    setUpdateSectionId(id);
    setUpdatedText("");
  }, []);

  const handleUpdate = useCallback(() => {
    if (!updateSectionId) return;
    updateTodo({ id: updateSectionId, text: updatedText });
    setUpdateSectionId(null);
  }, [updateSectionId, updatedText, updateTodo]);

  const handleDeleteTodo = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleToggleComplete = useCallback(
    (id: string) => {
      toggleComplete({ id: id, completed: true });
    },
    [toggleComplete]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching todos:", error);
    return (
      <div>
        Error: Failed to load todos. Please check the console for details.
      </div>
    );
  }

  return (
    <section>
      <ul className="list-none bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {data?.map((todo: Todo) => (
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
