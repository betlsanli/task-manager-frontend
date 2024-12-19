import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Dashboard from '../components/dashboard/Dashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard'


const HomePage = () => {
    const[isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user === null) {
          setIsAdmin(null); // Default to false if no user is found
      } else {
          // Parse the user and check the `isAdmin` value
          const parsedUser = JSON.parse(user);
          setIsAdmin(parsedUser.isAdmin); // Use the correct property from the parsed user
      }
    }, []);

    return (
        <>
          {/* Render based on isAdmin */}
          {isAdmin === null ? null : isAdmin ? <AdminDashboard /> : <Dashboard />}
        </>
      );
};

export default HomePage;
