import React, { useState, useEffect } from 'react'; // Ensure hooks are imported
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';



const projects = [
  { id: 1, name: 'Website Redesign', description: 'Redesign the main corporate website for better UX/UI' },
  { id: 2, name: 'Database Migration', description: 'Migrate database infrastructure to AWS' },
  { id: 3, name: 'Mobile App Development', description: 'Develop a mobile app for user engagement' },
  { id: 4, name: 'Security Audit', description: 'Conduct a comprehensive security audit for key assets' },
  { id: 5, name: 'Data Analysis Dashboard', description: 'Build a BI dashboard for monitoring analytics' },
  { id: 6, name: 'AI Integration',  description: 'Integrate AI features into user-facing platforms' },
];

const AllProjects = () => {

  return (
    <>
      <Typography variant="h4" fontWeight="bold" style={{ margin: '16px 0', padding: '0 25px', fontSize: '25px' }}>
        All Projects
      </Typography>
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project-dashboard/${project.id}`}
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

  
};

export default AllProjects;
