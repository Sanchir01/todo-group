// Интерфейс задачи (Todo)
export interface Todo {
	id: string
	title: string
	completed: boolean
	userId: number
}

export interface TodosState {
	items: Todo[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

export const initialState: TodosState = {
	items: [],
	status: 'idle',
	error: null
}
