import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "~/app/store/todos/slice.ts";
import { apiTodoSlice } from "~/app/store/api/todoById.ts";
import { apiAllTodos } from "./api/allTodos";

const rootReducer = combineReducers({
	todos: todosSlice.reducer,
	[apiTodoSlice.reducerPath]: apiTodoSlice.reducer,
	[apiAllTodos.reducerPath]: apiAllTodos.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(apiTodoSlice.middleware)
			.concat(apiAllTodos.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
