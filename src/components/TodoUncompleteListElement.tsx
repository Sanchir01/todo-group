import { EditTodo, Todo } from '~/shared/types/todoTypes'

export const TodoUncompleteListElement: React.FC<{
	todo: Todo
	editTodo: EditTodo | null
	handleEditTodo: (editTidi: EditTodo) => void
	handleCompleteTodo: (todo: Todo) => void
	handleDeleteTodo: (todoId: Todo['id']) => void
}> = ({
	todo,
	editTodo,
	handleEditTodo,
	handleCompleteTodo,
	handleDeleteTodo
}) => {
	return (
		<li key={todo.id}>
			{editTodo && editTodo.id === todo.id ? (
				<input
					type='text'
					value={editTodo.title}
					onChange={e => handleEditTodo({ ...editTodo, title: e.target.value })}
				/>
			) : (
				<span>{todo.title}</span>
			)}
			<button onClick={() => handleCompleteTodo(todo)}>Complete</button>
			<button
				onClick={() => handleEditTodo({ id: todo.id, title: todo.title })}
			>
				Edit
			</button>
			<button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
		</li>
	)
}
