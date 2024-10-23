import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "~/shared/types/todo.inteface.ts";
import {
	createTodoThunk,
	AllTodosThunk,
	deleteTodoThunk,
	updateTodoThunk,
} from "~/app/store/todos/asyncActions.ts";

export interface TodosState {
	todos: ITodo[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

export const initialState: TodosState = {
	todos: [],
	status: "idle",
	error: null,
};

export const todosSlice = createSlice({
	initialState,
	name: "todos",
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(AllTodosThunk.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(AllTodosThunk.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.todos = payload;
		});
		builder.addCase(AllTodosThunk.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message || "Failed to fetch todos";
		});

		builder.addCase(deleteTodoThunk.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.todos = state.todos.filter((item) => item.id !== action.payload);
		});
		builder.addCase(deleteTodoThunk.rejected, (state) => {
			state.status = "failed";
			state.error = "Failed to delete todo";
		});
		builder.addCase(updateTodoThunk.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(
			updateTodoThunk.fulfilled,
			(state, { payload }: PayloadAction<ITodo>) => {
				state.status = "succeeded";
				const index = state.todos.findIndex((item) => item.id === payload.id);
				if (index !== -1) {
					state.todos[index] = payload;
				}
			},
		);
		builder.addCase(updateTodoThunk.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message || "Failed to update todo";
		});
		builder.addCase(createTodoThunk.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(createTodoThunk.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.todos.push(action.payload);
		});
	},
});
