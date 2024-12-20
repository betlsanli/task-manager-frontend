import React from 'react';
import { Box } from '@mui/material';
import Menu from '../menu/Menu.js';
import Footer from '../footer/Footer.js';
import { Outlet } from 'react-router-dom';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';

function Layout({handleLogout}) {
  /* const loggedIn = localStorage.getItem('token') !== null; // Check token existence
  useAxiosInterceptor(handleLogout, loggedIn); */
  return (
    <>
      {/* Top Navigation Menu */}
      <Menu onLogout={handleLogout}/>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, width: '100%', padding: '0' }}>
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Layout;
