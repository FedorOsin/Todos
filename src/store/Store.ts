import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@features/todo/todoSlice";
import { todoApi } from "@features/todo/todoApi";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
