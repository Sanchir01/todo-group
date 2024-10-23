import { Link } from "react-router-dom";
import { useAllTodosQuery } from "~/app/store/api/allTodos";

const RtkQueryPage = () => {
	const { data, isLoading, isSuccess } = useAllTodosQuery();
	return (
		<div>
			<h1>Todo List</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : isSuccess ? (
				data.map((todo) => (
					<div key={todo.id}>
						<h2>{todo.title}</h2>
						<p>id пользователя: {todo.userId}</p>
						<Link to={`/${todo.id}`}>Просмотреть детали</Link>
					</div>
				))
			) : (
				<div className="">Ошибка во время загрузки</div>
			)}
			<Link to="/">
				<button type="button">На главную страницу</button>
			</Link>
		</div>
	);
};

export default RtkQueryPage;
