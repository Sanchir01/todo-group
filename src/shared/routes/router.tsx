import { createBrowserRouter } from 'react-router-dom'
import Main from '~/pages/main'
import OneTodo from '~/pages/oneTodo'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />
	},
	{
		path: '/:id',
		element: <OneTodo />
	}
])
