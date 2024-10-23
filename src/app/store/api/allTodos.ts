import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITodo } from "~/shared/types/todo.inteface";

export const apiAllTodos = createApi({
	reducerPath: "allTodos",
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
	tagTypes: ["allTodos"],
	endpoints: (build) => ({
		allTodos: build.query<ITodo[], void>({
			query: () => "/todos",
			providesTags: () => [{ type: "allTodos" }],
		}),
	}),
});

export const { useAllTodosQuery } = apiAllTodos;
