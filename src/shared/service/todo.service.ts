import { instance } from '../api/instance'
import { ITodo } from '~/shared/types/todo.inteface.ts'

export const todoService = {
	allTodos: async () => {
		const { data } = await instance<ITodo[]>({
			url: '/todos',
			method: 'GET'
		})
		return data
	},
	async ToDoById(id: number) {
		const { data } = await instance<ITodo>({
			url: `/todos/${id}`,
			method: 'GET'
		})
		return data
	},
	async updateTodo(todo: ITodo) {
		const { data } = await instance({
			url: `/todos/${todo.id}`,
			method: 'PUT',
			data: todo
		})
		return data
	},
	async createTodo(todo: {
		title: string
		completed: boolean
		userId: number
	}) {
		const { data } = await instance<ITodo>({
			url: '/todos',
			method: 'POST',
			data: todo
		})
		return data
	},
	async deleteTodo(id: number) {
		await instance({
			url: `/todos/${id}`,
			method: 'DELETE'
		})
		return id
	}
}
