import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from "axios";

/*
  // Sample data
  const projects = [
    { id: 1, name: 'Project Alpha', lead: 'Alice' },
    { id: 2, name: 'Project Beta', lead: 'Bob' },
    { id: 3, name: 'Project Gamma', lead: 'Charlie' },
    { id: 4, name: 'Project Delta', lead: 'David' },
    { id: 5, name: 'Project Omega', lead: 'Eve' },

  ];
  
  const tasks = [
    { id: 1, name: 'Design Homepage', status: 'TO_DO', project: 'Project Alpha' },
    { id: 2, name: 'Setup Database', status: 'IN_PROGRESS', project: 'Project Beta' },
    { id: 3, name: 'Deploy App', status: 'DONE', project: 'Project Gamma' },
    { id: 4, name: 'Write Unit Tests', status: 'TO_DO', project: 'Project Delta' },
    { id: 5, name: 'Fix Bugs', status: 'IN_PROGRESS', project: 'Project Omega' },
    { id: 6, name: 'Design Homepage', status: 'TO_DO', project: 'Project Alpha' },
    { id: 7, name: 'Setup Database', status: 'IN_PROGRESS', project: 'Project Beta' },
    { id: 8, name: 'Deploy App', status: 'DONE', project: 'Project Gamma' },
    
];
  */
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
  
const Dashboard = () => {
    /*
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
  
    const handleTaskClick = (task) => {
      setSelectedTask(task);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedTask(null);
    };
    */
    /*
  const projects = [
    { id: 1, name: 'Project 1', lead: 'Alice' },
    { id: 2, name: 'Project 2', lead: 'Bob' },
    { id: 3, name: 'Project 3', lead: 'Charlie' },
  ];

  const tasks = [
    { id: 1, name: 'Task 1', project: 'Project 1' },
    { id: 2, name: 'Task 2', project: 'Project 2' },
    { id: 3, name: 'Task 3', project: 'Project 3' },
  ];
  */
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);


  /*
  // Fetch user data dynamically from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users"); // Adjust endpoint to backend's user fetch URL
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch project data dynamically from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };

    fetchProjects();
  }, []);

  // Fetch tasks dynamically from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching task data", error);
      }
    };

    fetchTasks();
  }, []);

  */

  useEffect(() => {
    // Simulate fetching users
    const sampleUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    ];
    setUsers(sampleUsers);

    try {
      axios.get('/project/all-project')
        .then((response) => setProjects(response.data))
        .catch((error) => console.error('Error fetching projects:', error));
    } catch (error) { console.error('Error fetching projects:', error); }

    try {
      axios.get('/task/all-task')
        .then((response) => setTasks(response.data))
        .catch((error) => console.error('Error fetching tasks:', error));
    } catch (error) { console.error('Error fetching tasks:', error); }


  }, []);


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
            to={`/project/${project.id}`}
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
              Priority: {task.priority}
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
                backgroundColor: statusColors[task.status],
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>

    // <Box padding={3} display="flex" flexDirection="column" gap={3}>
    //   {/* Projects Section */}
    //   <Box>
    //     <Typography variant="h5">My Projects</Typography>
    //     <Box display="flex" gap={2} flexWrap="wrap">
    //       {projects.slice(0, 5).map((project) => (
    //         <Link
    //           key={project.id}
    //           to={`/project/${project.id}`}
    //           style={{ textDecoration: 'none', color: 'inherit' }}
    //         >
    //           <Paper
    //             sx={{
    //               padding: 2,
    //               flex: '1 1 calc(33.333% - 16px)',
    //               minWidth: 250,
    //               cursor: 'pointer',
    //               '&:hover': {
    //                 backgroundColor: '#f0f0f0',
    //               },
    //             }}
    //           >
    //             <Typography variant="h6">{project.name}</Typography>
    //             <Typography variant="body2">Lead: {project.lead}</Typography>
    //           </Paper>
    //         </Link>
    //       ))}
    //     </Box>
    //     <Button component={Link} to="/projects" sx={{ marginTop: 2 }}>
    //       Show All Projects
    //     </Button>
    //   </Box>

    //   {/* Tasks Section */}
    //   <Box>
    //     <Typography variant="h5">Assigned Tasks</Typography>
    //     <Box display="flex" gap={2} flexWrap="wrap">
    //       {tasks.slice(0, 10).map((task) => (
    //         <Paper
    //           key={task.id}
    //           sx={{
    //             padding: 2,
    //             flex: '1 1 calc(33.333% - 16px)',
    //             minWidth: 250,
    //             cursor: 'pointer',
    //             '&:hover': {
    //               backgroundColor: '#f0f0f0',
    //             },
    //           }}
    //         >
    //           <Typography variant="h6">{task.name}</Typography>
    //           <Typography variant="body2">Project: {task.project}</Typography>
    //         </Paper>
    //       ))}
    //     </Box>
    //     <Button component={Link} to="/tasks" sx={{ marginTop: 2 }}>
    //       Show All Tasks
    //     </Button>
    //   </Box>
    // </Box>
  );
};

export default Dashboard;
