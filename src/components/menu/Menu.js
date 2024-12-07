import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu as MuiMenu, MenuItem, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // React Router's navigation hook

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProjectSelect = (projectId) => {
    handleMenuClose(); // Close the dropdown menu
    navigate(`/project/${projectId}`); // Navigate to the project page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.light' }}>
      <Toolbar>
        {/* Home Navigation */}
        <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>

        {/* Projects Dropdown */}
        <Typography
          variant="h6"
          aria-controls="project-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          sx={{ cursor: 'pointer', mr: 2, flexGrow: 1 }}
        >
          Projects
        </Typography>
        <MuiMenu
          id="project-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'project-button',
          }}
        >
          <MenuItem onClick={() => handleProjectSelect(1)}>Project 1</MenuItem>
          <MenuItem onClick={() => handleProjectSelect(2)}>Project 2</MenuItem>
          <MenuItem onClick={() => handleProjectSelect(3)}>Project 3</MenuItem>
        </MuiMenu>

        {/* Search Bar */}
        <TextField
          size="small"
          placeholder="Search"
          variant="outlined"
          sx={{ mr: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Profile Icon */}
        <IconButton edge="end" color="inherit" aria-label="profile">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
