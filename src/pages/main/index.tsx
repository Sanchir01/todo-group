import {
	selectAllTodos,
	selectTodosError,
	selectTodosStatus,
} from "~/app/store/todos/selectors.ts";
import { useEffect, useState } from "react";
import {
	createTodoThunk,
	AllTodosThunk,
	deleteTodoThunk,
	updateTodoThunk,
} from "~/app/store/todos/asyncActions.ts";
import { useAppDispatch, useRedux } from "~/shared/hooks/useRedux.ts";
import { Link } from "react-router-dom";

function Main() {
	const dispatch = useAppDispatch();
	const todos = useRedux(selectAllTodos);
	const status = useRedux(selectTodosStatus);
	const error = useRedux(selectTodosError);
	const [newTodo, setNewTodo] = useState("");
	const [editTodo, setEditTodo] = useState<{
		id: number;
		title: string;
	} | null>(null);

	useEffect(() => {
		if (status === "idle") {
			dispatch(AllTodosThunk());
		}
	}, [dispatch, status]);

	const handleAddTodo = () => {
		if (newTodo.trim()) {
			dispatch(
				createTodoThunk({
					title: newTodo,
					completed: false,
					userId: 1,
					id: 1,
				}),
			);
			setNewTodo("");
		}
	};
	// Функция для обновления задачи
	const handleUpdateTodo = () => {
		if (editTodo?.title.trim()) {
			dispatch(
				updateTodoThunk({
					id: editTodo.id,
					title: editTodo.title,
					completed: false,
					userId: 1,
				}),
			);
			setEditTodo(null);
		}
	};
	// Функция для удаления задачи
	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodoThunk({ id }));
	};
	return (
		<div>
			<h1>Todo List</h1>
			{status === "loading" && <p>Loading...</p>}
			{status === "failed" && <p>Error: {error}</p>}
			{status === "succeeded" && (
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							{editTodo && editTodo.id === todo.id ? (
								<input
									type="text"
									value={editTodo.title}
									onChange={(e) =>
										setEditTodo({ ...editTodo, title: e.target.value })
									}
								/>
							) : (
								<Link to={`/${todo.id}`}>
									<span>
										{todo.title} -{" "}
										{todo.completed ? "Completed" : "Not Completed"}
									</span>
								</Link>
							)}
							<button
								type="button"
								onClick={() => setEditTodo({ id: todo.id, title: todo.title })}
							>
								Edit
							</button>
							<button type="button" onClick={() => handleDeleteTodo(todo.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
			<input
				type="text"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder="Add a new todo"
			/>
			<button type="button" onClick={handleAddTodo}>
				Add Todo
			</button>
			<Link to="/rtk">
				<button type="button">на rtk query</button>
			</Link>
			{editTodo && (
				<div>
					<button type="button" onClick={handleUpdateTodo}>
						Update Todo
					</button>
					<button type="button" onClick={() => setEditTodo(null)}>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}

export default Main;
