import { instance } from "~/shared/api/instance"
import type { Todo } from "~/shared/types/todoTypes"

export const getAllTodos = () => {
	return instance.get("/todos");
};

export const getTodoById = (id: number) => {
	return instance.get(`/todos/${id}`);
};

export const createTodo = (newTodo: {
	title: string;
	completed: boolean;
	userId: number;
}) => {
	return instance.post("/todos", newTodo);
};

export const updateTodoById = (updatedTodo: Todo) => {
	return instance.put(`/todos/${updatedTodo.id}`, updatedTodo);
};

export const deleteTodoById = (id: string) => {
	return instance.delete(`/todos/${id}`);
};
