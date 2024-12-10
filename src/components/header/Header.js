import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Task Manager
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/projects">Projects</Button>
                <Button color="inherit">Tasks</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
