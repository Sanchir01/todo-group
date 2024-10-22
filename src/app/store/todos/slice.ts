import { createSlice } from '@reduxjs/toolkit'
import { ITodo } from '~/shared/types/todo.inteface.ts'
import { AllTodos, deleteTodo } from '~/app/store/todos/asyncActions.ts'

export interface TodosState {
	todos: ITodo[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

export const initialState: TodosState = {
	todos: [],
	status: 'idle',
	error: null
}

export const todosSlice = createSlice({
	initialState,
	name: 'todos',
	reducers: {},
	extraReducers: builder => {
		builder.addCase(AllTodos.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(AllTodos.fulfilled, (state, { payload }) => {
			state.status = 'succeeded'
			state.todos = payload
		})
		builder.addCase(AllTodos.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message || 'Failed to fetch todos'
		})

		builder.addCase(deleteTodo.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(deleteTodo.fulfilled, (state, action) => {
			state.todos = state.todos.filter(item => item.id !== action.payload)
		})
		builder.addCase(deleteTodo.rejected, state => {
			state.error = 'Failed to delete todo'
		})
	}
})
