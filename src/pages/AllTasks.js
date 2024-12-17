import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { LowPriority } from '@mui/icons-material';
import TaskDetails from '../components/kanban/taskDetail/TaskDetail.js'; // Reuse TaskDetail component


//sample data
const sampleProjects = ['Website Redesign', 'Database Migration', 'Mobile App Development'];
const samplePriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const sampleUsers = [
  { id: '1', username: 'Alice Johnson' },
  { id: '2', username: 'Bob Smith' },
  { id: '3', username: 'Clara James' },
];
const tasks = [
  { id: 1, name: 'Design Homepage', priority: 'HIGH', status: 'TO_DO', project: 'Website Redesign', 
    user: [
    { username: 'Alice Johnson', role: 'Manager' },
    { username: 'Bob Smith', role: 'Developer' }
  ] },
  { id: 2, name: 'Setup Database', priority: 'MEDIUM', status: 'IN_PROGRESS', project: 'Database Migration', user: [{ username: 'Bob Smith', role: 'Developer' } ]},
  { id: 3, name: 'Develop Login API', priority: 'HIGH', status: 'DONE', project: 'Mobile App Development', user: [{ username: 'Clara James', role: 'Developer' }] },
  { id: 4, name: 'Write Security Report', priority: 'LOW', status: 'TO_DO', project: 'Security Audit', user: [{ username: 'David Miller', role: 'Developer' }] },
  { id: 5, name: 'Setup Analytics Dashboard', priority: 'CRITICAL', status: 'IN_PROGRESS', project: 'Data Analysis Dashboard', user: [{ username: 'Eve Carter', role: 'Developer' }] },
  { id: 6, name: 'AI Research Paper', priority: 'LOW', status: 'IN_PROGRESS', project: 'AI Integration', user: [{ username: 'Franklin Moore', role: 'Manager' }] },
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

const priorityColors = {
  LOW: '#8FD849',
  MEDIUM: '#F1F44A',
  HIGH: '#F16022',
  CRITICAL: '#E91111',
};

const priorityLabels = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
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
  

  const handleTaskClick = (task) => {
    setSelectedTask(task); // Open task details
  };

  const handleCloseTaskDetails = () => {
    setSelectedTask(null); // Close task details
  };

  const handleSaveTask = (updatedTask) => {
    console.log('Saving task:', updatedTask);
    setSelectedTask(null); // Close task details
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
         onClick={() => handleTaskClick(task)}
         >
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Priority: <span style={{ color: priorityColors[task.priority] }}>{priorityLabels[task.priority]}</span> 
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {statusLabels[task.status]}
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
      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetails
          visible={!!selectedTask}
          task={selectedTask}
          onClose={handleCloseTaskDetails}
          onSave={handleSaveTask}
        />
      )}
    </>
  );
};

export default AllTasks;
