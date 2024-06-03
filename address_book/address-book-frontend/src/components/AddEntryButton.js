import React from 'react';
import { Button } from '@mui/material';

const AddEntryButton = ({ onClick }) => {
    return (
        <Button 
            variant="contained" 
            onClick={onClick}
            style={{ 
                backgroundColor: '#F5763A', 
                color: '#fff', 
                margin: '20px 0', 
                padding: '10px 20px', 
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
            }}
        >
            Add New Entry
        </Button>
    );
}

export default AddEntryButton;
