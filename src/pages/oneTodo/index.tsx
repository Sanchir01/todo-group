import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useTodoByIDQuery } from '~/app/store/api/todoById.ts'

const OneTodo: FC = () => {
	const { id = '' } = useParams<{ id: string }>()
	const { data, isLoading, isSuccess } = useTodoByIDQuery({ id })
	console.log(data)
	return isLoading ? (
		'loading'
	) : isSuccess ? (
		<div>
			<h1>{data.id}</h1>
			<h1>{data.title}</h1>
			<p>{<data className=''></data>}</p>
		</div>
	) : (
		<h1>Not found</h1>
	)
}

export default OneTodo