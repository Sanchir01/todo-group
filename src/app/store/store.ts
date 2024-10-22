import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { todosSlice } from '~/app/store/todos/slice.ts'
import { apiSlice } from '~/app/store/api/todoById.ts'

const rootReducer = combineReducers({
	todos: todosSlice.reducer,
	[apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch