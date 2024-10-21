import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todosSlice } from './Slices/todos'

const rootReducer = combineReducers({
	todos: todosSlice.reducer
})


export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
