import { Link, useParams } from "react-router-dom";
import { useTodoByIDQuery } from "~/app/store/api/todoById.ts";
import st from "~/shared/styles/OneTodo.module.scss";
const OneTodo = () => {
	const { id = "" } = useParams<{ id: string }>();
	const { data, isLoading, isSuccess } = useTodoByIDQuery({ id });
	console.log(data);
	return isLoading ? (
		"loading"
	) : isSuccess ? (
		<div className={st.onetodo}>
			<h1>{data.id}</h1>
			<h1>{data.title}</h1>
			<p>{<data className="">id пользователя = {data.userId}</data>}</p>
			<Link to={"/"}>
				<button type="button">на главную</button>
			</Link>
		</div>
	) : (
		<h1>Not found</h1>
	);
};

export default OneTodo;
