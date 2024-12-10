import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';


//sample data
const sampleProjects = ['Website Redesign', 'Database Migration', 'Mobile App Development'];
const samplePriorities = ['Low', 'Medium', 'High'];
const sampleUsers = [
  { id: '1', username: 'Alice Johnson' },
  { id: '2', username: 'Bob Smith' },
  { id: '3', username: 'Clara James' },
];
const tasks = [
  { id: 1, name: 'Design Homepage', priority: 'High', status: 'TO_DO', project: 'Website Redesign', 
    user: [
    { username: 'Alice Johnson', role: 'Manager' },
    { username: 'Bob Smith', role: 'Developer' }
  ] },
  { id: 2, name: 'Setup Database', priority: 'Medium', status: 'IN_PROGRESS', project: 'Database Migration', user: [{ username: 'Bob Smith', role: 'Developer' } ]},
  { id: 3, name: 'Develop Login API', priority: 'High', status: 'DONE', project: 'Mobile App Development', user: [{ username: 'Clara James', role: 'Developer' }] },
  { id: 4, name: 'Write Security Report', priority: 'Low', status: 'TO_DO', project: 'Security Audit', user: [{ username: 'David Miller', role: 'Developer' }] },
  { id: 5, name: 'Setup Analytics Dashboard', priority: 'Medium', status: 'IN_PROGRESS', project: 'Data Analysis Dashboard', user: [{ username: 'Eve Carter', role: 'Developer' }] },
  { id: 6, name: 'AI Research Paper', priority: 'Low', status: 'IN_PROGRESS', project: 'AI Integration', user: [{ username: 'Franklin Moore', role: 'Manager' }] },
];


// Status Colors
const statusColors = {
  TO_DO: '#D170EB',
  IN_PROGRESS: '#E3E855',
  DONE: '#91E94E',
};

const statusLabels = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

const AllTasks = () => {
  /*
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
  */

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenDialog = (task) => {
    setSelectedTask({ ...task });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleChange = (field, value) => {
    setSelectedTask(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Typography
        //variant="h4"
        fontWeight="bold"
        style={{ margin: '16px 0', padding: '0 25px', fontSize: '25px'}}
      >
        All Tasks
      </Typography>
      {tasks.map((task) => (
         <Box
         key={task.id}
         sx={{
          border: '1px solid #424242', // Dark gray border
          borderRadius: 3,
          padding: 2,
          margin: '16px 16px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', // Slightly stronger shadow
          transition: 'background-color 0.2s ease',
          backgroundColor: '#1E1E1E', // Default background for dark theme
          color: '#FFFFFF', // White text for visibility
          '&:hover': { backgroundColor: '#333333' }, // Slightly lighter hover background
         }}
         onClick={() => handleOpenDialog(task)}
          >
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Priority: {task.priority}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: <span style={{ color: statusColors[task.status] }}>{statusLabels[task.status]}</span> 
            </Typography>
            {/* this will change since there is no username */}
            <Typography variant="body2" color="textSecondary" mt={1}>
              Assigned Users:
              {task.user.length > 0
                ? task.user.map((user, index) => (
                    <span key={index}>
                      {' '}
                      {user.username} ({user.role})
                      {index < task.user.length - 1 ? ', ' : ''}
                    </span>
                  ))
                : ' Unassigned'}
            </Typography>
            
          </Box>
        
      ))}
      {/* Task Popup */}
      {selectedTask && (
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            {/* Title */}
            <TextField
              margin="normal"
              label="Task Title"
              variant="outlined"
              fullWidth
              value={selectedTask.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {/* Description */}
            <TextField
              margin="normal"
              label="Task Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={selectedTask.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
            {/* Project Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Project</InputLabel>
              <Select
                value={selectedTask.project}
                onChange={(e) => handleChange('project', e.target.value)}
              >
                {sampleProjects.map((project) => (
                  <MenuItem key={project} value={project}>{project}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Priority Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedTask.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                {samplePriorities.map((priority) => (
                  <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Assigned User Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Assigned User</InputLabel>
              <Select
                value={selectedTask.user?.username || ''}
                onChange={(e) => handleChange('user', { username: e.target.value })}
              >
                {sampleUsers.map((user) => (
                  <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCloseDialog} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AllTasks;
