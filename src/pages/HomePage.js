import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ProjectPage from './ProjectPage';
import Dashboard from '../components/dashboard/Dashboard';


const HomePage = () => {


    return (
        <Box padding={3}>
          
          {/* Dashboard Component */}
            <Dashboard />
        </Box>
      );
};

export default HomePage;
