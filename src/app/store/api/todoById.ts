import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITodo } from "~/shared/types/todo.inteface.ts";

export const apiTodoSlice = createApi({
	reducerPath: "todosById",
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
	tagTypes: ["todosById"],
	endpoints: (build) => ({
		todoByID: build.query<ITodo, { id: number | string }>({
			query: ({ id }: { id: number | string }) => `/todos/${id}`,
			providesTags: () => [{ type: "todosById" }],
		}),
	}),
});
export const { useTodoByIDQuery } = apiTodoSlice;
