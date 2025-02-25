import React from "react";
import { Todos } from "../components/Todos";
import { Form } from "../components/Form";

function TodoReduxPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO (Redux)</h1>
      <Form useRedux={true} />
      <Todos useRedux={true} />
    </div>
  );
}

export default TodoReduxPage;
