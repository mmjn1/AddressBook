import React from 'react';
import { TextField } from '@mui/material';

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div style={{ margin: '20px 0' }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth={false}
                style={{ width: '20%' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default Search;