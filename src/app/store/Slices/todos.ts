import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [],
    isLoading: false,
    error: null,
}
export const todosSlice = createSlice({
    initialState,
    name: 'todos',
    reducers: {
        getAllTodos: (state, action) => {
            state.todos = action.payload
        }
    }
})

