import { useState, ChangeEvent, } from 'react';
import { Box, TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const TaskInput= () => {

    const [inputValue, setInputValue] = useState<string>('');
    const [label, setLabel] = useState<string>('Add new task');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleFocus = () => {
        setLabel('');

    }

    const handleButtonClick = () => {
        if (inputValue.trim()) {
            console.log('New Task:', inputValue);
            setInputValue('');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
            }}
        >
            <TextField
                label={inputValue ? '' : label}
                variant="outlined"
                value={inputValue}
                onFocus={handleFocus}
                onChange={handleInputChange}
                sx={{
                    border: '1px solid #3E1671',
                    borderRadius: '10px',
                    width: '341px',
                    fontSize: '16px',
                    color: '#777777',
                    '& .MuiInputBase-root': {
                        border: 'none', // Убираем рамку
                        backgroundColor: 'transparent', // Прозрачный фон
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none', // Убираем рамку для варианта outlined
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#777777', // Цвет метки при фокусировке
                        transform: 'translate(0, 0)',
                    },
                }}
            />
            <Button
                variant="contained"
                onClick={handleButtonClick}
                onFocus={(e) => e.currentTarget.blur()}
                sx={{
                    padding: '16px',
                    backgroundColor: '#9E78CF',
                    borderRadius: '10px'
                }}
            >
                <AddIcon 
                    fontSize='medium'
                />
            </Button>
        </Box>
    );
}

export default TaskInput;
