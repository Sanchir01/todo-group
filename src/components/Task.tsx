import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface TaskProps {
    title: string;
    onComplete: () => void;
    onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ title, onComplete, onDelete }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '8px',
                backgroundColor: '#15101C',
            }}
        >
            <Typography variant="body1" sx={{ color: '#9E78CF' }}>
                {title}
            </Typography>
            <Box>
                <IconButton 
                    onFocus={(e) => e.currentTarget.blur()}
                    onClick={onComplete} 
                    sx={{ color: '#9E78CF' }}
                >
                    <CheckIcon />
                </IconButton>
                <IconButton 
                    onFocus={(e) => e.currentTarget.blur()}
                    onClick={onDelete}
                    sx={{ color: '#9E78CF' }}
                >    
                    <DeleteOutlineIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Task;
