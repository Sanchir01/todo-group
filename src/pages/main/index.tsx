import type React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '~/app/store/store'
import {
	selectTodosStatus,
	selectTodosError,
	fetchTodos
} from '~/app/store/todosSlice'
import TaskInput from '~/components/TaskInput'
import Task from '~/components/Task'
import st from '~/shared/styles/main.module.scss'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Typography } from '@mui/material'
const MainPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const todos = useSelector((state: RootState) => state.todos.items)
	const status = useSelector(selectTodosStatus)
	const error = useSelector(selectTodosError)
	const [parent] = useAutoAnimate({ easing: 'ease-in-out', duration: 500 })
	const isExistCompletedTasks = todos.filter(todo => todo.completed === false)
	const isExistDoneTasks = todos.filter(todo => todo.completed === true)
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTodos())
		}
	}, [dispatch, status])

	if (status === 'loading') {
		return status === 'loading' && <p>Loading...</p>
	}
	if (status === 'failed') {
		return status === 'failed' && <p>Error: {error}</p>
	}
	return (
		<div className={st.main}>
			<TaskInput />
			<div className={st.main__tasks} ref={parent}>
				{isExistCompletedTasks.length > 0 && (
					<div className={st.main__title}>
						<Typography variant='h6'>Completed Tasks</Typography>
						<Typography variant='h6' component={'span'}>
							- {isExistCompletedTasks.length}
						</Typography>
					</div>
				)}
				<div>
					{todos.map(
						todo =>
							todo.completed === false && (
								<Task
									key={todo.id}
									title={todo.title}
									id={todo.id}
									userId={todo.userId}
									completed={todo.completed}
								/>
							)
					)}
				</div>
			</div>
			<div className={st.main__tasks} ref={parent}>
				{isExistDoneTasks.length > 0 && (
					<div className={st.main__title}>
						<Typography variant='h6'>Done Tasks</Typography>
						<Typography variant='h6' component={'span'}>
							- {isExistDoneTasks.length}
						</Typography>
					</div>
				)}
				<div>
					{todos.map(
						todo =>
							todo.completed === true && (
								<Task
									key={todo.id}
									title={todo.title}
									id={todo.id}
									userId={todo.userId}
									completed={todo.completed}
								/>
							)
					)}
				</div>
			</div>
		</div>
	)
}

export default MainPage
