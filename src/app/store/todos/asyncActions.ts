import { createAsyncThunk } from '@reduxjs/toolkit'
import { todoService } from '~/shared/service/todo.service.ts'
import { ITodo } from '~/shared/types/todo.inteface.ts'

export const AllTodos = createAsyncThunk('todos/allTodos', async () => {
	const response = await todoService.allTodos()
	return response
})

export const addTodo = createAsyncThunk(
	'todos/addTodo',
	async (newTodo: { title: string; completed: boolean; userId: number }) => {
		const response = await todoService.createTodo(newTodo)
		return response
	}
)

export const deleteTodo = createAsyncThunk<number, { id: number }>(
	'todos/deleteTodo',
	async ({ id }: { id: number }, thunkAPI) => {
		try {
			const response = await todoService.deleteTodo(id)
			return response
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)
export const updateTodo = createAsyncThunk(
	'todos/updateTodo',
	async (todo: ITodo) => {
		const response = await todoService.updateTodo(todo)
		return response
	}
)

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
