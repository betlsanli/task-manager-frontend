import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu as MuiMenu, MenuItem, Typography, TextField, InputAdornment, Avatar, Box, Button, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axiosInstance from '../../axiosInstance';

import { useNavigate } from 'react-router-dom';

/*
const sampleUserData = {
  username: 'John Doe',
  email: 'john@example.com',
  role: 'Developer',
};
const sampleTeams = [
  { id: 1, name: 'Team 1' },
  { id: 2, name: 'Team 2' },
  { id: 3, name: 'Team 3' },
];
*/
const sampleUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    role: 'Developer',
  },
];

const sampleTeams = [
  {
    id: 1,
    name: 'Team 1',
    members: [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    ],
  },
  {
    id: 2,
    name: 'Team 2',
    members: [
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
      { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
    ],
  },
];

const sampleProjects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Develop new features for the e-commerce platform',
    teamId: 1,
    managerId: 2,
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Design the new user onboarding experience',
    teamId: 2,
    managerId: 3,
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'Upgrade the database infrastructure',
    teamId: 2,
    managerId: 2,
  },
];

function Menu({onLogout}) {

  const [projectAnchor, setProjectAnchor] = useState(null);
  const [teamAnchor, setTeamAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    try {
      axiosInstance.get(`/user/profile`)
        .then((response) => {
          const userData = response.data;
          setCurrentUser(userData);

          // Update localStorage after setting state
          localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch((error) => console.error('Error fetching profile:', error));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, []);


  const navigate = useNavigate();

  const handleMenuClick = (event, setAnchor) => setAnchor(event.currentTarget);
  const handleMenuClose = (setAnchor) => setAnchor(null);

  // Navigate and Close Menu
  const handleNavigate = (path, closeAnchor) => {
    handleMenuClose(closeAnchor);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout() // Clear session
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.dark' }}>
      <Toolbar>
        {/* Home Navigation */}
        <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>

        {/* Projects Dropdown */}
        
        <Typography
          //variant="h6"
          aria-controls="project-menu"
          aria-haspopup="true"
          onClick={(e) => handleMenuClick(e, setProjectAnchor)}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', mr: 2, fontSize: '16px' }}
          >
          Projects
          <ExpandMoreIcon />

        </Typography>
        <MuiMenu
          id="project-menu"
          anchorEl={projectAnchor}
          open={Boolean(projectAnchor)}
          onClose={() => handleMenuClose(setProjectAnchor)}
          disableScrollLock={true} // <-- Prevents the scroll from being locked
        >
          {/* <MenuItem onClick={() => handleNavigate('/project/1', setProjectAnchor)}>Project 1</MenuItem>
          <MenuItem onClick={() => handleNavigate('/project/2', setProjectAnchor)}>Project 2</MenuItem>
          <MenuItem onClick={() => handleNavigate('/project/3', setProjectAnchor)}>Project 3</MenuItem> */}
          {sampleProjects.map((project) => (
            <MenuItem
              key={project.id}
              onClick={() => handleNavigate(`/project-dashboard/${project.id}`, setProjectAnchor)}
            >
              {project.name}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={() => handleNavigate('/projects', setProjectAnchor)}>See All Projects</MenuItem>
          <MenuItem>
            <IconButton color="inherit" size="small">
              <AddIcon />
            </IconButton>
            Add Project
          </MenuItem>
        </MuiMenu>

        {/* Teams Dropdown */}
        <Typography
          variant="h6"
          aria-controls="team-menu"
          aria-haspopup="true"
          onClick={(e) => handleMenuClick(e, setTeamAnchor)}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', mr: 2, fontSize: '16px'}}
        >
          Teams
          <ExpandMoreIcon />
        </Typography>
        <MuiMenu
          id="team-menu"
          anchorEl={teamAnchor}
          open={Boolean(teamAnchor)}
          onClose={() => handleMenuClose(setTeamAnchor)}
          disableScrollLock={true} // <-- Prevents the scroll from being locked
        >
          {sampleTeams.map((team) => (
            <MenuItem style={{ pointerEvents: 'none' }}
              key={team.id}
              onClick={() => handleNavigate(`/team/${team.id}`, setTeamAnchor)}
            >
              {team.name}
            </MenuItem>
          ))}
          {/* <MenuItem onClick={() => handleNavigate('/team/1', setTeamAnchor)}>Team 1</MenuItem>
          <MenuItem onClick={() => handleNavigate('/team/2', setTeamAnchor)}>Team 2</MenuItem>
          <MenuItem onClick={() => handleNavigate('/team/3', setTeamAnchor)}>Team 3</MenuItem> */}
          <Divider />   
          <MenuItem onClick={() => handleNavigate('/teams', setProjectAnchor)}>See All Teams</MenuItem>     
          <MenuItem>
            <IconButton color="inherit" size="small">
              <AddIcon />
            </IconButton>
            Add Team
          </MenuItem>
        </MuiMenu>

        {/* Search Bar */}
        <TextField
          size="small"
          placeholder="Search"
          variant="outlined"
          sx={{ width: 300, ml: 'auto', mr: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Profile Icon */}
        <IconButton onClick={(e) => handleMenuClick(e, setProfileAnchor)}>
          <AccountCircle />
        </IconButton>
        <MuiMenu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => handleMenuClose(setProfileAnchor)}
          disableScrollLock={true} // <-- Prevents the scroll from being locked

        >
          {/* <MenuItem style={{ pointerEvents: 'none' }}>
            <Typography variant="subtitle1">Username: {sampleUserData.username}</Typography>
          </MenuItem>
          <MenuItem style={{ pointerEvents: 'none' }}>
            <Typography variant="subtitle2">Email: {sampleUserData.email}</Typography>
          </MenuItem>
          <MenuItem style={{ pointerEvents: 'none' }}>
            <Typography variant="subtitle2">Role: {sampleUserData.role}</Typography>
          </MenuItem>
          <MenuItem onClick={() => console.log('Logging out')}>Logout</MenuItem>
        </MuiMenu> */}
        {currentUser && (
            <>
              <MenuItem style={{ pointerEvents: 'none' }}>
                <Typography variant="subtitle1">Name: {currentUser.firstName} {currentUser.lastName}</Typography>
              </MenuItem>
              <MenuItem style={{ pointerEvents: 'none' }}>
                <Typography variant="subtitle2">Email: {currentUser.email}</Typography>
              </MenuItem>
              <MenuItem style={{ pointerEvents: 'none' }}>
                <Typography variant="subtitle2">Role: {currentUser.isAdmin ? "Admin" : "User"}</Typography>
              </MenuItem>
            </>
          )}
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MuiMenu>
      </Toolbar>
    </AppBar>
  );

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const navigate = useNavigate(); // React Router's navigation hook

  // const handleMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleProjectSelect = (projectId) => {
  //   handleMenuClose(); // Close the dropdown menu
  //   navigate(`/project/${projectId}`); // Navigate to the project page
  // };

 
  // return (
  //   <AppBar position="static" sx={{ backgroundColor: 'primary.light' }}>
  //     <Toolbar>
  //       {/* Home Navigation */}
  //       <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} onClick={() => navigate('/')}>
  //         <HomeIcon />
  //       </IconButton>

  //       {/* Projects Dropdown */}
  //       <Typography
  //         variant="h6"
  //         aria-controls="project-menu"
  //         aria-haspopup="true"
  //         onClick={handleMenuClick}
  //         sx={{ cursor: 'pointer', mr: 2, flexGrow: 1 }}
  //       >
  //         Projects
  //       </Typography>
  //       <MuiMenu
  //         id="project-menu"
  //         anchorEl={anchorEl}
  //         open={open}
  //         onClose={handleMenuClose}
  //         MenuListProps={{
  //           'aria-labelledby': 'project-button',
  //         }}
  //       >
  //         <MenuItem onClick={() => handleProjectSelect(1)}>Project 1</MenuItem>
  //         <MenuItem onClick={() => handleProjectSelect(2)}>Project 2</MenuItem>
  //         <MenuItem onClick={() => handleProjectSelect(3)}>Project 3</MenuItem>
  //       </MuiMenu>

  //       {/* Search Bar */}
  //       <TextField
  //         size="small"
  //         placeholder="Search"
  //         variant="outlined"
  //         sx={{ mr: 2 }}
  //         InputProps={{
  //           startAdornment: (
  //             <InputAdornment position="start">
  //               <SearchIcon />
  //             </InputAdornment>
  //           ),
  //         }}
  //       />

  //       {/* Profile Icon */}
  //       <IconButton edge="end" color="inherit" aria-label="profile">
  //         <AccountCircle />
  //       </IconButton>
  //     </Toolbar>
  //   </AppBar>
  // );
}

export default Menu;
