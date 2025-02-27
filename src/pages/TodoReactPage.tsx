import React, { useState } from "react";
import { Todos } from "@components/Todos";
import { Form } from "@components/Form";
import { Todo } from "@types";

function TodoReactPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "0", text: "testReactTodo", completed: false },
  ]);

  const handleAddTodoReact = (text: string) => {
    console.log("onAddTodoReact called", text);
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO (React)</h1>
      <Form useRedux={false} onAddTodoReact={handleAddTodoReact} />
      <Todos useRedux={false} todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default TodoReactPage;
