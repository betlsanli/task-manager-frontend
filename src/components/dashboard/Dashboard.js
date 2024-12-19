import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from "../../axiosInstance.js";
import TaskDetails from "../kanban/taskDetail/TaskDetail.js"; // Adjust the import path as necessary


  // Status colors
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
  
  
const Dashboard = () => {
    
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Selected task for the modal

  useEffect(() => {
    // Simulate fetching users
    const sampleUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    ];
    setUsers(sampleUsers);

    try {
      axiosInstance.get('/project/all-project')
        .then((response) => setProjects(response.data))
        .catch((error) => console.error('Error fetching projects:', error));
    } catch (error) { console.error('Error fetching projects:', error); }

    try {
      axiosInstance.get('/task/all-task')
        .then((response) => setTasks(response.data))
        .catch((error) => console.error('Error fetching tasks:', error));
    } catch (error) { console.error('Error fetching tasks:', error); }


  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task); // Set the selected task for the modal
  };

  const handleCloseModal = () => {
    setSelectedTask(null); // Close the modal
  };

  const handleSaveTask = (updatedTask) => {
    // Update task in the backend
    axiosInstance.put(`/task/edit/${updatedTask.id}`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === response.data.id ? response.data : task
        );
        setTasks(updatedTasks); // Update task in the state
        setSelectedTask(null); // Close the modal
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  };

  return (
    <Box
      display="flex"
      gap={2}
      //padding={2}
      height="100vh"
      sx={{
        backgroundColor: '#121212', // dark background for the entire dashboard
      }}
    >
      {/* Left Panel: Projects Section */}
      <Box
        flex={1}
        padding={3}
        sx={{
        
          borderRadius: 4,
          border: '2px solid #424242',
          //borderRight: '1px solid #E0E0E0',
          backgroundColor: '#1E1E1E',
          height: '100%',
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold" color= "#FFFFFF">
            Projects
          </Typography>
          <Button component={Link} to="/projects" variant="text" color="#90CAF9">
            Show All
          </Button>
        </Box>

        {projects.slice(0, 5).map((project) => (
          <Link
            key={project.id}
            to={`/project-dashboard/${project.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={{
                padding: 2,
                mb: 2,
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: '#333333',
                cursor: 'pointer',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#424242',
                },
              }}
            >
              <Typography variant="h6">{project.title}</Typography>
              
            </Box>
          </Link>
        ))}
      </Box>

      {/* Right Panel: Tasks Section */}
      <Box
        flex={1.5}
        padding={3}
        sx={{
            borderRadius: 4,
          border: '2px solid #424242',
          backgroundColor: '#1E1E1E',
          height: '100%',
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold" color="#FFFFFF">
            Tasks
          </Typography>
          <Button component={Link} to="/tasks" variant="text" color="#90CAF9">
            Show All
          </Button>
        </Box>

        {tasks.slice(0,3).map((task) => (
          <Paper
            key={task.id}
            onClick={() => handleTaskClick(task)} // Open task modal on click

            sx={{
              padding: 2,
              mb: 2,
              boxShadow: 2,
              borderRadius: 2,
              backgroundColor: '#333333',
              position: 'relative',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#424242',
              },
            }}

          >
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Project: {task.project}
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Priority: {priorityLabels[task.priority]}
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Status: {statusLabels[task.status]}
            </Typography>
            

            {/* Status Indicator Circle */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                height: 12,
                width: 12,
                borderRadius: '50%',
                backgroundColor: priorityColors[task.priority],
              }}
            />
          </Paper>
        ))}
      </Box>
      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetails
          visible={!!selectedTask}
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    
    </Box>


  
  );
};

export default Dashboard;
