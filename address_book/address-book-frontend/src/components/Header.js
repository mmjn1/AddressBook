import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#fff', boxShadow: 'none' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <HomeIcon style={{ color: '#F5763A' }} />
                </IconButton>
                <Typography variant="h4" style={{ flexGrow: 1, color: '#000', fontSize: '2rem' }}>
                    Address<span style={{ color: '#F5763A' }}>Book</span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
