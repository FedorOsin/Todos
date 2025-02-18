import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
}

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [
    {
      id: "1",
      text: "Ваша первая заметка",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: Todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => {
        todo.id !== action.payload;
      });
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; newText: string }>
    ) => {
      const { id, newText } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = newText;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
