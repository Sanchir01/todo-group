import type React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '~/app/store/store'
import { deleteTodo, fetchTodos, updateTodo } from '~/app/store/todosSlice'
import type { Todo } from '~/shared/types/todoTypes'
import st from '~/shared/styles/task.module.scss'
const Task: React.FC<Todo> = ({ title, id, userId, completed }) => {
	const dispatch = useDispatch<AppDispatch>()

	const handleDeleteTodo = (id: string) => {
		console.log(id)
		dispatch(deleteTodo(id))
			.then(() => {
				dispatch(fetchTodos())
			})
			.catch(er => console.log(er))
	}

	const handleUpdateTodo = () => {
		dispatch(
			updateTodo({
				id: id,
				title: title,
				completed: !completed,
				userId: userId
			})
		).then(() => {
			dispatch(fetchTodos())
		})
	}
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '12px',
				borderRadius: '8px',
				marginBottom: '8px',
				backgroundColor: '#15101C'
			}}
		>
			<Typography
				variant='body1'
				sx={{ color: completed ? '#78CFB0 ' : '#9E78CF' }}
				className={completed ? st.task : ''}
			>
				{title}
			</Typography>
			<Box>
				{completed === true ? (
					<></>
				) : (
					<IconButton
						onFocus={e => e.currentTarget.blur()}
						onClick={() => handleUpdateTodo()}
						sx={{ color: '#9E78CF' }}
					>
						<CheckIcon />
					</IconButton>
				)}
				<IconButton
					onFocus={e => e.currentTarget.blur()}
					onClick={() => handleDeleteTodo(id)}
					sx={{ color: '#9E78CF' }}
				>
					<DeleteOutlineIcon />
				</IconButton>
			</Box>
		</Box>
	)
}

export default Task
