import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "~/app/store/store";
import {
	selectTodosStatus,
	selectTodosError,
	fetchTodos,
} from "~/app/store/todosSlice";
import TaskInput from "~/components/TaskInput";
import Task from "~/components/Task";
import st from "~/shared/styles/main.module.scss";
const MainPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const todos = useSelector((state: RootState) => state.todos.items);
	const status = useSelector(selectTodosStatus);
	const error = useSelector(selectTodosError);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchTodos());
		}
	}, [dispatch, status]);

	if (status === "loading") {
		return status === "loading" && <p>Loading...</p>;
	}
	if (status === "failed") {
		return status === "failed" && <p>Error: {error}</p>;
	}
	return (
		<div className={st.main}>
			<TaskInput />
			<div>
				{todos.map(
					(todo) =>
						todo.completed === false && (
							<div key={todo.id}>
								<Task
									title={todo.title}
									id={todo.id}
									userId={todo.userId}
									completed={todo.completed}
								/>
							</div>
						),
				)}
			</div>
			{todos.map(
				(todo) =>
					todo.completed === true && <div key={todo.id}>{todo.title}</div>,
			)}
		</div>
	);
};

export default MainPage;
