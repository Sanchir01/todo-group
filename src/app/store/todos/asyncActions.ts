import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "~/shared/service/todo.service.ts";
import type { ITodo } from "~/shared/types/todo.inteface.ts";

export const AllTodosThunk = createAsyncThunk("todos/allTodos", async () => {
	const response = await todoService.allTodos();
	return response;
});

export const deleteTodoThunk = createAsyncThunk<number, { id: number }>(
	"todos/deleteTodo",
	async ({ id }: { id: number }, thunkAPI) => {
		try {
			const response = await todoService.deleteTodo(id);
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);
export const updateTodoThunk = createAsyncThunk(
	"todos/updateTodo",
	async (todo: ITodo) => {
		const response = await todoService.updateTodo(todo);
		return response;
	},
);

export const createTodoThunk = createAsyncThunk<ITodo, ITodo>(
	"todos/createTodo",
	async (todo: Omit<ITodo, "id">) => {
		const response = await todoService.createTodo(todo);
		return response;
	},
);

// export const TodoById = createAsyncThunk<ITodo, { id: number }>(
// 	'todos/todoById',
// 	async ({ id }: { id: number }, thunkAPI) => {
// 		try {
// 			const response = await todoService.ToDoById(id)
// 			return response
// 		} catch (e) {
// 			return thunkAPI.rejectWithValue(e)
// 		}
// 	}
// )
