import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "@types";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos" as const, id })),
              { type: "Todos" as const, id: "LIST" },
            ]
          : [{ type: "Todos" as const, id: "LIST" }],
    }),

    addTodo: builder.mutation<
      Todo,
      { text: string; description: string; priority: "low" | "medium" | "high" }
    >({
      query: ({ text, description, priority }) => ({
        url: "/todos",
        method: "POST",
        body: { text, completed: false, description, priority },
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    updateTodo: builder.mutation<Todo, Pick<Todo, "id" | "text">>({
      query: ({ id, text }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),

    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    toggleComplete: builder.mutation<Todo, Pick<Todo, "id" | "completed">>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleCompleteMutation,
} = todoApi;
