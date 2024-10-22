import { RootState } from '~/app/store/store.ts'

export const selectAllTodos = (state: RootState) => state.todos.todos
export const selectTodosStatus = (state: RootState) => state.todos.status
export const selectTodosError = (state: RootState) => state.todos.error
// export const selectTodoById = (state: RootState, id: number) =>
// 	state.todos.todos.find(todo => todo.id === id)
