import React, { useState, useEffect } from 'react'; // Ensure hooks are imported
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';


// Sample projects data
/*
const projects = [
  { id: 1, name: 'Project Alpha', lead: 'Alice', description: 'Building a new homepage' },
  { id: 2, name: 'Project Beta', lead: 'Bob', description: 'Setting up database schema' },
  { id: 3, name: 'Project Gamma', lead: 'Charlie', description: 'Deploying new feature' },
  { id: 4, name: 'Project Delta', lead: 'David', description: 'Creating unit tests' },
  { id: 5, name: 'Project Omega', lead: 'Eve', description: 'Debugging user reports' },
  { id: 6, name: 'Project Zeta', lead: 'Frank', description: 'Implementing user authentication' },
  { id: 7, name: 'Project Eta', lead: 'Grace', description: 'Optimizing performance' },
  { id: 8, name: 'Project Theta', lead: 'Hank', description: 'Setting up CI/CD pipelines' },

];
*/
const projects = [
  { id: 1, name: 'Website Redesign', description: 'Redesign the main corporate website for better UX/UI' },
  { id: 2, name: 'Database Migration', description: 'Migrate database infrastructure to AWS' },
  { id: 3, name: 'Mobile App Development', description: 'Develop a mobile app for user engagement' },
  { id: 4, name: 'Security Audit', description: 'Conduct a comprehensive security audit for key assets' },
  { id: 5, name: 'Data Analysis Dashboard', description: 'Build a BI dashboard for monitoring analytics' },
  { id: 6, name: 'AI Integration',  description: 'Integrate AI features into user-facing platforms' },
];

const AllProjects = () => {

  /*
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  */
  /*
  useEffect(() => {
    fetch('/api/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);
*/

  return (
    <>
      <Typography variant="h4" fontWeight="bold" style={{ margin: '16px 0', padding: '0 25px', fontSize: '25px' }}>
        All Projects
      </Typography>
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box
            sx={{
              border: '1px solid #424242',
              borderRadius: 3,
              padding: 2,
              margin: '16px 16px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', // Slightly stronger shadow for dark mode
              transition: 'background-color 0.2s ease',
              backgroundColor: '#333333',
              color: '#FFFFFF', // White text

              '&:hover': { backgroundColor: '#424242' },
            }}
          >
            <Typography variant="h6">{project.name}</Typography>
            
            <Typography variant="body2" color="textSecondary" mt={1}>
              Description: {project.description}
            </Typography>
          </Box>
        </Link>
      ))}
    </>
  );

    /*
    <Box 
        padding={4} 
        sx={{ 
            backgroundColor: '#FFFFFF', 
            height: '100vh',
            overflowY: 'auto',

        }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        All Projects
      </Typography>

      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box
            sx={{
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              padding: 2,
              mb: 3,
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.2s ease',
              '&:hover': { backgroundColor: '#EFEFEF' },
            }}
          >
            <Typography variant="h6">{project.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Lead: {project.lead}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              Description: {project.description}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
  */
};

export default AllProjects;
