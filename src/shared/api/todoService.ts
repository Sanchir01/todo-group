import {instance} from '../api/instance';
import { Todo } from '../types/todoTypes';

export const getAllTodos = () => {
  return instance.get('/todos');
};

export const getTodoById = (id: number) => {
  return instance.get(`/todos/${id}`);
};

export const createTodo = (newTodo: { title: string; completed: boolean; userId: number }) => {
  return instance.post('/todos', newTodo);
};

export const updateTodoById = (updatedTodo: Todo) => {
  return instance.put(`/todos/${updatedTodo.id}`, updatedTodo);
};

export const deleteTodoById = (id: number) => {
  return instance.delete(`/todos/${id}`);
};