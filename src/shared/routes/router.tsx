import { createBrowserRouter } from "react-router-dom";
import Main from "~/pages/main";
import OneTodo from "~/pages/oneTodo";
import RtkQueryPage from "~/pages/rtk";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		
	},
	{
		path: "/:id",
		element: <OneTodo />,
	},
	{
		path: "/rtk",
		element: <RtkQueryPage />,
	},
]);
