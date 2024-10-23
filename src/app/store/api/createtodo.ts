import type { ITodo } from "~/shared/types/todo.inteface";
import { apiTodoSlice } from "./todoById";

export const createTodo = apiTodoSlice.injectEndpoints({
	endpoints: (builder) => ({
		createTodo: builder.mutation<undefined, ITodo>({
			query: (todo) => ({
				url: `/todos/${todo.id}`,
				method: "POST",
				body: todo,
			}),
			invalidatesTags: () => [{ type: "todosById" }],
		}),
	}),
});

export const { useCreateTodoMutation } = createTodo;
