import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/store/store'
import {
	selectTodosStatus,
	selectTodosError,
	addTodo,
	fetchTodos,
	updateTodo,
	deleteTodo,
	Todo
} from '~/app/store/todosSlice'

const TodoAppDemo: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const todos = useSelector((state: RootState) => state.todos.items)
	const status = useSelector(selectTodosStatus)
	const error = useSelector(selectTodosError)
	const [newTodo, setNewTodo] = useState('')
	const [editTodo, setEditTodo] = useState<{
		id: number
		title: string
	} | null>(null)

	// Загружаем задачи при монтировании компонента
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTodos())
		}
	}, [dispatch, status])

	// Функция для добавления новой задачи
	const handleAddTodo = () => {
		if (newTodo.trim()) {
			dispatch(addTodo({ title: newTodo, completed: false, userId: 1 })).then(
				() => {
					dispatch(fetchTodos())
				}
			)
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
			).then(() => {
				dispatch(fetchTodos())
			})
			setEditTodo(null)
		}
	}

	// Функция для удаления задачи
	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodo(id)).then(() => {
			dispatch(fetchTodos())
		})
	}

	// Функция для изменения статуса задачи на Complete
	const handleCompleteTodo = (todo: Todo) => {
		dispatch(
			updateTodo({
				id: todo.id,
				title: todo.title,
				completed: !todo.completed,
				userId: todo.userId
			})
		).then(() => {
			dispatch(fetchTodos())
		})
	}

  const uncompletedTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);

	return (
		<div>
			<h1>Todo List</h1>

			{status === 'loading' && <p>Loading...</p>}
			{status === 'failed' && <p>Error: {error}</p>}

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

      <h2>Tasks to do - {uncompletedTodos.length}</h2>

			<ul>
				{uncompletedTodos
					.map(todo => (
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
									{todo.title}
								</span>
							)}
							<button onClick={() => handleCompleteTodo(todo)}>Complete</button>
							<button
								onClick={() => setEditTodo({ id: todo.id, title: todo.title })}
							>
								Edit
							</button>
							<button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
						</li>
					))}
			</ul>

      <h2>Done - {completedTodos.length}</h2>

			<ul>
				{completedTodos
					.map(todo => (
						<li key={todo.id}>
							<span>
								{todo.title}
							</span>
							<button onClick={() => handleCompleteTodo(todo)}>
								Uncomplete
							</button>
						</li>
					))}
			</ul>
		</div>
	)
}

export default TodoAppDemo
