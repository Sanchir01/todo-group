import { Todo } from '~/shared/types/todoTypes'

export const TodoCompleteListElement: React.FC<{
	todo: Todo
	handleCompleteTodo: (todo: Todo) => void
}> = ({ todo, handleCompleteTodo }) => {
	return (
		<li key={todo.id}>
			<span>{todo.title}</span>
			<button onClick={() => handleCompleteTodo(todo)}>Uncomplete</button>
		</li>
	)
}
