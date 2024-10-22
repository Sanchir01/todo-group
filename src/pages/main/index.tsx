import {
	selectAllTodos,
	selectTodosError,
	selectTodosStatus
} from '~/app/store/todos/selectors.ts'
import { useEffect, useState } from 'react'
import {
	addTodo,
	AllTodos,
	deleteTodo,
	updateTodo
} from '~/app/store/todos/asyncActions.ts'
import { useAppDispatch, useRedux } from '~/shared/hooks/useRedux.ts'

function Main() {
	const dispatch = useAppDispatch()
	const todos = useRedux(selectAllTodos)
	const status = useRedux(selectTodosStatus)
	const error = useRedux(selectTodosError)
	const [newTodo, setNewTodo] = useState('')
	const [editTodo, setEditTodo] = useState<{
		id: number
		title: string
	} | null>(null)
	// Загружаем задачи при монтировании компонента
	useEffect(() => {
		if (status === 'idle') {
			dispatch(AllTodos())
		}
	}, [dispatch, status])
	// Функция для добавления новой задачи
	const handleAddTodo = () => {
		if (newTodo.trim()) {
			dispatch(addTodo({ title: newTodo, completed: false, userId: 1 }))
			setNewTodo('')
		}
	}
	// Функция для обновления задачи
	const handleUpdateTodo = () => {
		if (editTodo && editTodo.title.trim()) {
			dispatch(
				updateTodo({
					id: editTodo.id,
					title: editTodo.title,
					completed: false,
					userId: 1
				})
			)
			setEditTodo(null)
		}
	}
	// Функция для удаления задачи
	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodo({ id }))
	}
	return (
		<div>
			<h1>Todo List</h1>
			{status === 'loading' && <p>Loading...</p>}
			{status === 'failed' && <p>Error: {error}</p>}
			{status === 'succeeded' && (
				<ul>
					{todos.map(todo => (
						<li key={todo.id}>
							{editTodo && editTodo.id === todo.id ? (
								<input
									type='text'
									value={editTodo.title}
									onChange={e =>
										setEditTodo({ ...editTodo, title: e.target.value })
									}
								/>
							) : (
								<span>
									{todo.title} -{' '}
									{todo.completed ? 'Completed' : 'Not Completed'}
								</span>
							)}
							<button
								onClick={() => setEditTodo({ id: todo.id, title: todo.title })}
							>
								Edit
							</button>
							<button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
						</li>
					))}
				</ul>
			)}
			<input
				type='text'
				value={newTodo}
				onChange={e => setNewTodo(e.target.value)}
				placeholder='Add a new todo'
			/>
			<button onClick={handleAddTodo}>Add Todo</button>
			{editTodo && (
				<div>
					<button onClick={handleUpdateTodo}>Update Todo</button>
					<button onClick={() => setEditTodo(null)}>Cancel</button>
				</div>
			)}
		</div>
	)
}

export default Main
