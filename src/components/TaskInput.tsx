import { useState, type ChangeEvent } from "react";
import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addTodo, fetchTodos } from "~/app/store/todosSlice";
import type { AppDispatch } from "~/app/store/store";
import { useDispatch } from "react-redux";
const TaskInput = () => {
	const [label, setLabel] = useState<string>("Add new task");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodo(e.target.value);
	};

	const [newTodo, setNewTodo] = useState<string>("");
	const handleFocus = () => {
		setLabel("");
	};
	const dispatch = useDispatch<AppDispatch>();

	const handleAddTodo = () => {
		if (newTodo.trim()) {
			dispatch(addTodo({ title: newTodo, completed: false, userId: 1 })).then(
				() => {
					dispatch(fetchTodos());
				},
			);
			setNewTodo("");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: "15px",
			}}
		>
			<TextField
				label={newTodo ? "" : label}
				variant="outlined"
				value={newTodo}
				onFocus={handleFocus}
				onChange={handleInputChange}
				sx={{
					border: "1px solid #3E1671",
					borderRadius: "10px",
					width: "341px",
					fontSize: "16px",
					color: "#777777",
					"& .MuiInputBase-root": {
						border: "none", // Убираем рамку
						backgroundColor: "transparent", // Прозрачный фон
					},
					"& .MuiOutlinedInput-notchedOutline": {
						border: "none", // Убираем рамку для варианта outlined
					},
					"& .MuiInputLabel-root.Mui-focused": {
						color: "#777777", // Цвет метки при фокусировке
						transform: "translate(0, 0)",
					},
				}}
			/>
			<Button
				variant="contained"
				onClick={handleAddTodo}
				onFocus={(e) => e.currentTarget.blur()}
				sx={{
					padding: "16px",
					backgroundColor: "#9E78CF",
					borderRadius: "10px",
				}}
			>
				<AddIcon fontSize="medium" />
			</Button>
		</Box>
	);
};

export default TaskInput;
